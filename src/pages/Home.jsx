/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Home page**/

/*Description:
This is the User Sign up Page where the user needs to plug in their mobile number.
It also contains a link to the Terms and conditions page if the User wants to read
through it. If the User is already signed Up but hs logged off the application or
deleted the app but the decides to install the app again, then the user needs to
sign in before making use of the services.
*/

/*Page import statements*/
import React from 'react'
import {
    IonContent,
    IonPage,
    IonList,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
    IonTitle,
    IonCheckbox,
    IonToast
} from '@ionic/react';
import {Link} from 'react-router-dom';
import '../pages/user/sidenav.css'
import { Capacitor, Plugins, CallbackID } from "@capacitor/core";
import LocationService from "./user/Location"

/*Ionic plugin to retrieve the user location from device*/
const { Geolocation, Toast } = Plugins;

/*Global variables*/
var fieldTitle = ''
var MissingTitles = ""
var canUseGPS;

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "phone": "",
            "tc": false
        }
        this.getCurrentPosition = this
            .getCurrentPosition
            .bind(this);
    }

    refreshPage() {
        window
            .location
            .reload();
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

     
    async componentDidMount() {
        this.getCurrentPosition();
        this.checkPermissions();
    }

    /*Retrieve the user location from device*/
    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        let Latitude = coordinates.coords.latitude;
        let Longitude = coordinates.coords.longitude;
        localStorage.setItem('Latitude', JSON.stringify(Latitude));
        localStorage.setItem('Longitude', JSON.stringify(Longitude));
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    Tc = () => {
        this.setState(initialState => ({
            tc: !initialState.tc
        }));
    }

    /*On submit functionality along with validations*/
    submit() {
        if (!this.state.phone) {
            fieldTitle = "Phone number cannot be empty"
            this.handleToast()
        }
        if (this.state.phone) {
            if (this.state.phone.length < 10) {
                fieldTitle = "Phone Number must contain 10 digits"
                this.handleToast()
            }
            if (this.state.phone.length === 10) {
                var regex = /^\d{10}$/
                var result = regex.test(this.state.phone)
                console.log(result)
                if (result === false) {
                    fieldTitle = "Phone number can contain only digits(0-9)"
                    this.handleToast()
                }
            }
            if ((this.state.tc === false)) {
                fieldTitle = "Terms and conditions must be accepted!"
                this.handleToast()
            }
        }
        if (result === true && this.state.tc === true) {
            let data = this.state;
            let flag = this.state1;
            //API call to get the OTP to the registered mobile number provided
            fetch('https://www.jrapp.tech/api/user/registration-send-otp/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((result) => {
                result
                    .json()
                    .then((resp) => {
                        if (resp.status === 'success') {
                            /*On success, setting the user phone in the local storage*/
                            let obj = this.state.phone;
                            localStorage.setItem('phone', JSON.stringify(obj));
                            this
                                .props
                                .history
                                .push({pathname: '/otp', data: data});
                            this.refreshPage();
                        } else {
                            fieldTitle = "Phone number already registered"
                            this.handleToast()
                        }
                    })
                    .catch(error => {
                        console.log("Invalid number", error);
                    });
            })
        }
    }

    render() {

        return (
            <IonPage>
                <IonContent className="Contents">                    
                    <IonList>
                        <img
                            className="mx-auto rounded-circle RH_Logo"
                            src={require('../img/JR_2.jpg')}
                            alt="my_img"/>
                        <IonItem className="hea">
                            <IonLabel className="names" color="dark" position="floating">Mobile Number</IonLabel>
                            <IonInput
                                inputMode="tel"
                                clearInput={true}
                                value={this.state.phone}
                                onIonChange={(data) => {
                                this.setState({phone: data.target.value})
                            }}
                                maxlength={10}></IonInput>
                        </IonItem>

                        <IonItem
                            lines="none"
                            style={{
                            marginLeft: "-1rem"
                        }}>
                            <IonCheckbox checked={this.state.tc} onIonChange={this.Tc}/>
                            <Link className="tag" to="/Terms">
                                <IonLabel className="pad">
                                    Terms and Conditions
                                </IonLabel>
                            </Link>
                        </IonItem>
                    </IonList>
                    <IonButton
                        onClick={() => {
                        this.submit()
                    }}
                        className="names"
                        color="success"
                        style={{
                        width: "15rem",
                        fontSize: "1rem"
                    }}>SIGN UP
                    </IonButton>

                    <h6>
                        <p className="names">Already a User?
                            <Link className="tag" to="/SignIn">
                                <b>
                                    SIGN IN
                                </b>
                            </Link>
                        </p>
                    </h6>
                    <IonTitle
                        className="Header"
                        style={{
                        fontSize: "35px"
                    }}>
                        <b className="color contHead">J</b>eeva<b className="color">R</b>aksha
                        <IonTitle className="Header ComHeader" color="success">Saving Lives, Assuring Care</IonTitle>

                    </IonTitle>
                    <IonToast
                        isOpen={this.state.show}
                        onDidDismiss={() => this.handleToast()}
                        message={fieldTitle}
                        duration={3000}/>

                </IonContent>
            </IonPage>
        )
    }
}

export default Home

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/