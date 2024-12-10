/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Map container page**/

/*Description:
This is the Map container page which displays the distance between point A to point B.
It also allows the user to call the provider along with the route drawn on the map page
along with cancel functionality for the user.
*/

/*global google*/
/*Page import statements*/
import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {withGoogleMap, GoogleMap, DirectionsRenderer,Marker} from "react-google-maps";
import {
    IonCol,
    IonFabList,
    IonFabButton,
    IonFab,
    IonRow,
    IonList,
    IonItem,
    IonLabel,
    IonToast,
    IonIcon
} from '@ionic/react';
import {callSharp} from 'ionicons/icons'
import CallPage from './CallPage'
import {Plugins} from '@capacitor/core';
const {BackgroundTask} = Plugins;

/*Global Variables*/
var auth_token;
var servId;
var latng;
var lonng;
var ExpertLat;
var ExpertLng;
var dist;
var dur;
var ExpertName;
var ExpertPhone;
var fieldTitle = ''
let map;
let markers = [];
const API = "AIzaSyAQrRDi6PI32Wc5sEFfo4zn25b7MlbQgPM"

const test = {
    maxHeight: "100%"
}

const card = {
    marginTop: "0px"
}

const mod = {
    width: "15rem",
    borderRadius: "0.5rem",
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

class MapContainer extends Component {
    intervalID = 0
    constructor(props) {
        super(props);
        auth_token = JSON.parse(localStorage.getItem('token'))
        servId = JSON.parse(localStorage.getItem('ServiceId'))
        latng = JSON.parse(localStorage.getItem('Latitude'))
        lonng = JSON.parse(localStorage.getItem('Longitude'))
        ExpertLat = JSON.parse(localStorage.getItem('ExpertLat'))
        ExpertLng = JSON.parse(localStorage.getItem('ExpertLng'))
        ExpertName = JSON.parse(localStorage.getItem('ExpertName'))
        ExpertPhone = JSON.parse(localStorage.getItem('ExpertPhone'))
        dist = JSON.parse(localStorage.getItem('distance'))
        dur = JSON.parse(localStorage.getItem('duration'))
        this.state = {
            directions: null,
            "latng": latng,
            "lonng": lonng,
            "ExpertLat": ExpertLat,
            "ExpertLng": ExpertLng,
            "serviceid": servId,
            "serviceflag": "Accept",
            "service_status": "",
            "reason": "Traffic-Jam"
        };
        this.CancelRequest = this
            .CancelRequest
            .bind(this);
        this.CancelClick = this
            .CancelClick
            .bind(this);
        this.Distance_matrix = this
            .Distance_matrix
            .bind(this);
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    /*Method to cancel the Service from the user end*/
    CancelClick() {
        this.state.service_status = 'user'
        fetch('https://www.jrapp.tech/api/services/cancel-service/', {
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
                    if (resp.message === 'Service Status Changed') {
                        console.log(resp.message);
                        fieldTitle = "Request Cancelled by you"
                        this.handleToast();
                        window.location.href = '/UserHome'
                        localStorage.setItem('UPage', JSON.stringify('UserHome'));
                        localStorage.removeItem('ExpertName');
                        localStorage.removeItem('ExpertPhone');
                        localStorage.removeItem('ExpertLat');
                        localStorage.removeItem('ExpertLng');
                        localStorage.removeItem('distance');
                        localStorage.removeItem('duration');
                        localStorage.removeItem('Latitude');
                        localStorage.removeItem('Longitude');
                        localStorage.removeItem('ServiceId');
                        // this
                        //     .props
                        //     .history
                        //     .push({pathname: '/UserHome'});
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to receive information if the provider
     has reached the location or canceled a service*/
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
                    if (resp.message === 'Request is in active state') {
                    }
                    if (resp.message === 'Request cancelled by Volunteer') {
                        console.log(resp)
                        fieldTitle = "Request cancelled by Volunteer"
                        this.handleToast()
                        clearInterval(this.intervalID);
                        window.location.href = "/UserExpertSearch"
                        localStorage.removeItem('ExpertName');
                        localStorage.removeItem('ExpertPhone');
                        localStorage.removeItem('ExpertLat');
                        localStorage.removeItem('ExpertLng');
                        localStorage.removeItem('distance');
                        localStorage.removeItem('duration');
                    }
                    if (resp.message === "Reached") {
                        fieldTitle = "Volunteer has reached the Emergency location"
                        this.handleToast()
                        clearInterval(this.intervalID);
                        localStorage.setItem('UPage', JSON.stringify('UserHome'));
                        localStorage.removeItem('ExpertName');
                        localStorage.removeItem('ExpertPhone');
                        localStorage.removeItem('ExpertLat');
                        localStorage.removeItem('ExpertLng');
                        localStorage.removeItem('distance');
                        localStorage.removeItem('duration');
                        localStorage.removeItem('ServiceId');
                        localStorage.removeItem('Latitude');
                        localStorage.removeItem('Longitude');
                        window.location.href = '/UserHome'
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to draw the route on the map*/
    Distance_matrix() {
        const directionsService = new google
            .maps
            .DirectionsService();

        const origin = {
            lat: ExpertLat,
            lng: ExpertLng
        };
        const destination = {
            lat: parseFloat(latng),
            lng: parseFloat(lonng)
        };

        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({directions: result, suppressMarkers: true});
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    componentDidMount() {
        this.Distance_matrix();
        this.intervalID = setInterval(() => this.CancelRequest(), 3000);
        localStorage.setItem('UPage', JSON.stringify('UserExpert'));
    }

    render() {
        const GoogleMapDirections = withGoogleMap(props => (
            <GoogleMap zoom={10} style={test}>
                <DirectionsRenderer directions={this.state.directions}/>
                <IonFab vertical="bottom" horizontal="bottom" slot="fixed"
                style={{}}>
                    <IonRow>
                    <IonCol size="3" style={{paddingTop:"1rem"}}>                            
                            <IonFabButton style={{height:"4rem",width:"4rem"}}
                                onClick={() => {
                                this.CancelClick()
                            }}>
                                Cancel
                            </IonFabButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            {/* <IonFabButton style={{height:"4rem",width:"4rem"}}>
                                Info
                            </IonFabButton> */}
                            <IonItem lines="none">
                                <IonLabel className="contBod">
                                    <h5>Expert Name: {ExpertName} 
                                        <IonIcon
                                            onClick={() => new CallPage().Dialler(ExpertPhone)}
                                            size="small"
                                            style={{
                                            paddingLeft: "0.3rem"
                                        }}
                                            icon={callSharp}></IonIcon>
                                    </h5>
                                    <h5>Distance: {dist}</h5>
                                    <h5>ETA: {dur}</h5>
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                        {/* <IonCol size="2"></IonCol> */}
                        {/* <IonCol size="3" style={{paddingTop:"1rem"}}>                            
                            <IonFabButton style={{height:"4rem",width:"4rem"}}
                                onClick={() => {
                                this.CancelClick()
                            }}>
                                Cancel
                            </IonFabButton>
                        </IonCol> */}
                    </IonRow>
                    {/* <IonFabList side="top">
                        <IonList
                            style={{
                            padding: "0rem"
                        }}>
                            <IonItem lines="none">
                                <IonLabel className="contBod">
                                    <h5>Expert Name: {ExpertName}
                                        <IonIcon
                                            onClick={() => new CallPage().Dialler(ExpertPhone)}
                                            size="small"
                                            style={{
                                            paddingLeft: "0.3rem"
                                        }}
                                            icon={callSharp}></IonIcon>
                                    </h5>
                                    <h5>Distance: {dist}</h5>
                                    <h5>ETA: {dur}</h5>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonFabList> */}

                </IonFab>
                {/* <Marker
                icon={require('/React/JR_App/src/img/emergency1.png')}
                position={{
                lat: latng,
                lng: lonng
            }}/>

                <Marker
                icon={require('/React/JR_App/src/img/vest.png')}
                position={{
                lat: ExpertLat,
                lng: ExpertLng
            }}/> */}
            </GoogleMap>
        ));

        return (
            <div>
                <GoogleMapDirections
                    containerElement={< div style = {{ width: "100%"}}/>}
                    mapElement={< div className = "mapfunc" style = {{ height: "30rem" }}/>}></GoogleMapDirections>

                <IonToast
                    isOpen={this.state.show}
                    onDidDismiss={() => this.handleToast()}
                    message={fieldTitle}
                    duration={5000}/>
            </div>

        );
    }
}

export default MapContainer;

/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
