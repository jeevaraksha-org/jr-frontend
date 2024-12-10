/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Expert Search page**/

/*Description:
The User Expert Search page is the page where the user has raised a
request and is waiting for the expert to accept the request. The users
loaction is displayed for the user on the screen.
*/

/*Page import statements*/
import {
    IonPage,
    IonCard,
    IonSpinner,
    IonFabButton,
    IonCol,
    IonRow,
    IonFab,
    IonToast
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import {GoogleApiWrapper} from 'google-maps-react';
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {Link} from 'react-router-dom';
import {Plugins} from '@capacitor/core';
import Countdown from 'react-countdown';
const {BackgroundTask} = Plugins;
var auth_token;
var latng;
var lonng;
var servId;
var fieldTitle = ''
var distance;
var duration;

class UserExpertSearch extends React.Component {
    intervalID = 0;
    constructor(props) {
        super(props);
        let token = JSON.parse(localStorage.getItem('token'))
        latng = JSON.parse(localStorage.getItem('Latitude'))
        lonng = JSON.parse(localStorage.getItem('Longitude'))
        servId = JSON.parse(localStorage.getItem('ServiceId'))
        this.state = {
            "token": token,
            "serviceid": servId,
            "serviceflag": "Accept",
            "service_status": "user",
            "reason": "Traffic-Jam"
        };
        console.log(token);
        console.log("lat", latng);
        auth_token = token;
        this.GetVolunteerlocation = this
            .GetVolunteerlocation
            .bind(this);
        this.distance_matrix = this
            .distance_matrix
            .bind(this);
        this.CancelRequest = this
            .CancelRequest
            .bind(this);
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    /*Method to cancel the Service from the user end*/
    CancelClick() {
        let data = this.state;
        fetch('https://www.jrapp.tech/api/services/cancel-service/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result
                .json()
                .then((resp) => {
                    if (resp.message === 'Service Status Changed') {
                        fieldTitle = "Request cancelled by You"
                        this.handleToast()
                        clearInterval(this.intervalID);
                        localStorage.removeItem('UPage')
                        localStorage.removeItem('Latitude');
                        localStorage.removeItem('Longitude');
                        localStorage.removeItem('ServiceId');
                        this
                            .props
                            .history
                            .push({pathname: '/UserHome'});
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to receive information if the provider
     has canceled a service*/
    CancelRequest() {
        this.state.service_status = 'reached'
        fetch('https://www.jrapp.tech/api/services/service-status/', {
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
                    if (resp.message === 'Request cancelled by Volunteer') {
                        fieldTitle = "Request cancelled by Volunteer"
                        this.handleToast()
                        clearInterval(this.intervalID);
                        localStorage.removeItem('UPage')
                        window.location.href = "/UserHome"
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to provide the distance*/
    distance_matrix() {
        let data = this.state;
        fetch('https://www.jrapp.tech/api/services/distance-matrix/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result
                .json()
                .then((resp) => {
                    if (resp.status === 'success') {
                        distance = resp.distance_matrix.rows[0].elements[0].distance.text;
                        duration = resp.distance_matrix.rows[0].elements[0].duration.text;
                        localStorage.setItem('distance', JSON.stringify(distance));
                        localStorage.setItem('duration', JSON.stringify(duration));
                        clearInterval(this.intervalID);
                        this
                            .props
                            .history
                            .push({pathname: '/UserExpert'});
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to get the provider details along with the location*/
    GetVolunteerlocation() {
        let data = this.state;
        fetch('https://www.jrapp.tech/api/services/volunteer-details/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result
                .json()
                .then((resp) => {
                    if (resp.status === 'success') {
                        let ExpertName = resp.name;
                        localStorage.setItem('ExpertName', JSON.stringify(ExpertName));
                        let ExpertPhone = resp.phone;
                        localStorage.setItem('ExpertPhone', JSON.stringify(ExpertPhone));
                        let ExpertLat = resp.latitude;
                        localStorage.setItem('ExpertLat', JSON.stringify(ExpertLat));
                        let ExpertLng = resp.longitude;
                        localStorage.setItem('ExpertLng', JSON.stringify(ExpertLng));
                        this.distance_matrix();
                    } else if(resp.status === 'timeout'){
                        clearInterval(this.intervalID);
                        localStorage.removeItem('UPage')
                        this
                            .props
                            .history
                            .push({pathname: '/UserHome'});
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    componentDidMount() {
        localStorage.setItem('UPage', JSON.stringify('UserExpertSearch'));
        this.intervalID = setInterval(() => this.GetVolunteerlocation(), 3000);
    }

    render() {
        const MapWithAMarker = withGoogleMap(props => <GoogleMap
            defaultZoom={17}
            defaultCenter={{
            lat: latng,
            lng: lonng
        }}   
        >

            <IonFab vertical="bottom" horizontal="bottom" slot="fixed">
                <IonRow>
                    <IonCol size="9">
                        <IonCard className="mapbox">
                            <h5>Searching for Expert
                                <IonSpinner name="dots" color="success"/></h5>
                                <Countdown date={Date.now() + 300000} />
                        </IonCard>
                    </IonCol>
                    <IonCol size="3">
                        <Link to="/UserHome">
                            <IonFabButton
                                onClick={() => {
                                this.CancelClick()
                            }}>
                                Cancel
                            </IonFabButton>
                        </Link>
                    </IonCol>
                </IonRow>
            </IonFab>
            <Marker
                // icon={require('/React/JR_App/src/img/emergency1.png')}
                position={{
                lat: latng,
                lng: lonng
            }}/>
        </GoogleMap>)
        return (
            <IonPage>
                <div>
                    <MapWithAMarker
                        containerElement={
                        < div style = {{ width: "100%"}}/>}
                        mapElement={< div className = "mapfunc" style = {{ height: "30rem" }}/>}></MapWithAMarker>

                </div>
                <IonToast
                    isOpen={this.state.show}
                    onDidDismiss={() => this.handleToast()}
                    message={fieldTitle}
                    duration={5000}/>
            </IonPage>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyAQrRDi6PI32Wc5sEFfo4zn25b7MlbQgPM'})(UserExpertSearch);

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
