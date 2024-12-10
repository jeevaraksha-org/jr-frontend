/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Home page**/

/*Description:
This is the User Home page where the user needs to click on the emergency button
and pop up would be available with a call functionality for 108. Along this the
user may or may not fill the fields and then click on submit to raise a request
for volunteer to help. If the user requires any specific help then the user can
click on any of the six buttons based on the issue.
*/

/*Page import statements*/
import React from 'react';
import UserHomePage from '../UserHomePage';
import {callSharp} from 'ionicons/icons'
import {
    IonLabel,
    IonButton,
    IonPage,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonItem,
    IonHeader,
    IonSegment,
    IonTextarea,
    IonSegmentButton,
    IonNote,
    IonIcon,
    IonGrid,
    IonTitle
} from '@ionic/react';
import CallPage from './CallPage'
import { Capacitor, Plugins, CallbackID } from "@capacitor/core";
import LocationService from "./Location"
import Modal from 'simple-react-modal'

const test = {
    borderRadius: "1rem",
    width: "15rem",
    height: "12rem",
    margin: "0px auto",
    display: "table",
    position: "absolute",
    left: "50%",
    right: "50%",
    top: "50%",
    border: "1px solid",
    transform: "translate(-50%, -50%)",
    padding: "5px 20px 13px",
    background: "rgb(255, 255, 255)"
}

/*Global variables*/
var auth_token;
var latitude;
let lat;
let lng;
var longitude;
var emergency;
var canUseGPS;
const { Geolocation, Toast } = Plugins;

class UserHome extends React.Component {

    constructor() {
        super()
        auth_token = JSON.parse(localStorage.getItem('token'))
        latitude = JSON.parse(localStorage.getItem('Latitude'))
        longitude = JSON.parse(localStorage.getItem('Longitude'))
        this.state = {
            "servicedesc": "",
            "servicereqfor": "",
            "latitude": latitude,
            "longitude": longitude,
            "datetime": "",
            isButtonDisabled: false
        };
        this.authentication = this
            .authentication
            .bind(this);
        this.getCurrentPosition = this
            .getCurrentPosition
            .bind(this);
        this.close = this
            .close
            .bind(this);
    }

    show() {
        this.setState({show: true})
    }

    close() {
        this.setState({show: false})
    }

    checkPermissions = async () => {
        const hasPermission = await LocationService.checkGPSPermission();
        if (hasPermission) {
            if (Capacitor.isNative) {
                const canUseGPS = await LocationService.askToTurnOnGPS();
                this.postGPSPermission(canUseGPS);
            }
            else {
                this.postGPSPermission(true);
            }
        }
        else {
            console.log('14');
            const permission = await LocationService.requestGPSPermission();
            if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
                if (Capacitor.isNative) {
                    canUseGPS = await LocationService.askToTurnOnGPS();
                    this.postGPSPermission(canUseGPS);
                }
                else {
                    this.postGPSPermission(true);
                }
            }
            else {
                await Toast.show({
                    text: 'User denied location permission'
                })
            }
        }
    }

    postGPSPermission() {
        if (canUseGPS) {
            this.watchPosition();
        }
        else {
            console.log('Please turn on GPS to get location')
        }
    }

    watchPosition = async () => {
        try {
            this.setState({
                loading: true
            })
            this.watchId = Geolocation.watchPosition({}, (position, err) => {

                if (err) {
                    return;
                }
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    loading: false
                }, () => {
                    this.clearWatch();
                })
            })
        }
        catch (err) { console.log('err', err) }
    }

    clearWatch() {
        if (this.watchId != null) {
            Geolocation.clearWatch({ id: this.watchId });
        }
        this.setState({
            loading: false
        })
    }

    componentDidMount() {
        this.authentication();
        let timerId = setInterval(() => console.log(this.loc()), 5000);
        this.checkPermissions();
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    loc() {
        this.getCurrentPosition();
    }

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log(coordinates.coords.latitude,coordinates.coords.longitude)
        lat = coordinates.coords.latitude;
        lng = coordinates.coords.longitude;
        latitude = lat;
        longitude = lng;
        this.setState({
            "latitude": latitude,
            "longitude": longitude
        });
        localStorage.setItem('Latitude', JSON.stringify(latitude));
        localStorage.setItem('Longitude', JSON.stringify(longitude));
    }

    authentication() {
        console.log(auth_token)
        fetch('https://www.jrapp.tech/api/user/user-profile', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token
            }
        }).then((result) => {
            result
                .json()
                .then((resp) => {
                    if (resp.status === 'success') {
                        let Userdata = resp.UserInfo;
                        localStorage.setItem('Userdata', JSON.stringify(Userdata));
                        let UserMed = resp.HealthHistory
                        let username = resp.UserInfo.USER_FIRST_NM
                        localStorage.setItem('username', username);
                        localStorage.setItem('UserMed', JSON.stringify(UserMed));
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                    this
                    .props
                    .history
                    .push({pathname: '/UserHome'});
                });
        })
    }

    refreshPage() {
        window
            .location
            .reload();
    }

    watchPosition() {
        const wait = Geolocation.watchPosition({}, (position, err) => {})
    }

    handleSubmit() {
        this.setState({
            isButtonDisabled: true
        });
        if (this.state.servicedesc.length === 0) {
            this.setState({
                "latitude": latitude,
                "longitude": longitude
            });
            this.state.servicedesc = emergency
        } else {
            console.log("else", this.state.servicedesc)
        }
        console.log("inside submit func",lat,lng)
        console.log(this.state)        
        fetch('https://www.jrapp.tech/api/services/create-request/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result
                .json()
                .then((resp) => {
                    if (resp.status === 'success') {
                        this.setState({show: false})
                        let ServiceId = resp.service_id;
                        localStorage.setItem('ServiceId', JSON.stringify(ServiceId));
                        this.state.servicedesc = ''
                        this
                            .props
                            .history
                            .push({pathname: '/UserExpertSearch'});
                            this.setState({
                                isButtonDisabled: false
                            });
                            this.refreshPage();
                    }
                    else {
                        console.log("not working")
                    }
                })
                .catch(error => {
                    console.log("Registration not done", error);
                });
        })
    }

    buttonClick(props) {
        emergency = props;
        this.getCurrentPosition();
    }

    render() {
        return (
            <IonPage>
                <div>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">
                                <UserHomePage/>
                            </IonCol>
                            <IonCol size="10">
                                <IonTitle
                                    className="Header Allpagesheading"
                                    style={{
                                    marginTop: "0.5rem",
                                    paddingLeft: "2.1rem"
                                }}
                                    color="success">Emergencies</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <div className="test">
                        <IonRow>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Child Health Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/babyboy.png')}
                                            alt="my_img"/>
                                        <h5>Child Health</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Cardiac Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/heartproblem.png')}
                                            alt="my_img"/>
                                            <h5>Cardiac</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Maternity Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/maternity.png')}
                                            alt="my_img"/>
                                            <h5>Pregnancy</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Respiratory Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/pneumonia.png')}
                                            alt="my_img"/>
                                            <h5>Respiratory</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Poison Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/potion.png')}
                                            alt="my_img"/>
                                        <h5>Poison</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                            <IonCol size="6">
                                <IonCard
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Orthopedic Emergencies SOS");
                                }}>
                                    <IonCardContent>
                                        <img
                                            className="mx-auto rounded-circle card_img"
                                            src={require('/React/JR_App/src/img/brokenbone.png')}
                                            alt="my_img"/>
                                        <h5>Orthopedic</h5>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6">
                                <IonButton
                                    expand="block"
                                    onClick={() => {
                                    this.show();
                                    this.buttonClick("Emergency SOS");
                                }}>Emergency</IonButton>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={() => new CallPage().Dialler('6363910978')} expand="block">Call 108</IonButton>
                            </IonCol>
                        </IonRow>
                    </div>
                    <Modal containerStyle={test} show={this.state.show} onClose={this.close}>
                        <IonHeader className="head contHead">Emergency</IonHeader>
                        <IonNote
                            className="contBod"
                            style={{
                            paddingLeft: "6rem"
                        }}>Call 108
                            <IonIcon
                                style={{
                                paddingLeft: "0.3rem"
                            }}
                                onClick={() => new CallPage().Dialler('6363910978')}
                                icon={callSharp}></IonIcon>
                        </IonNote>
                        <IonItem>
                            <IonTextarea
                                className="contBod"
                                style={{
                                width: "15rem"
                            }}
                                spellcheck="true"
                                color="dark"
                                placeholder="Type your Emergency message here..."
                                value={this.state.servicedesc}
                                onIonChange={(data) => {
                                this.setState({servicedesc: data.target.value})
                            }}
                                rows="4"
                                cols="50"/>
                        </IonItem>
                        <IonRow>
                            <IonSegment
                                onIonChange={(data) => {
                                this.setState({servicereqfor: data.target.value})
                            }}>
                                <IonSegmentButton value="Self">
                                    <IonLabel className="contBod">Self</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="Others">
                                    <IonLabel className="contBod">Others</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonRow>
                        <IonRow>
                            <IonCol size="1"></IonCol>
                            <IonCol size="4">
                                <IonButton className="contBod" onClick={() => this.handleSubmit()} disabled={this.state.isButtonDisabled}>Submit</IonButton>
                            </IonCol>
                            <IonCol size="1"></IonCol>
                            <IonCol size="4">
                                <IonButton className="contBod" onClick={() => this.close()}>Cancel</IonButton>
                            </IonCol>
                            <IonCol size="1"></IonCol>
                        </IonRow>
                    </Modal>

                </div>
            </IonPage>
        )
    }
}

export default UserHome;

/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
