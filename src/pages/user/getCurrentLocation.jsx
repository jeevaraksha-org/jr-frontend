import React from 'react';
import {Plugins} from '@capacitor/core';
import {
    IonPage
} from '@ionic/react';
/*Global variables*/
var auth_token;
var latitude;
var longitude;

const {Geolocation} = Plugins;

class getCurrentLocation extends React.Component {

    constructor() {
        super()
        //auth_token = JSON.parse(localStorage.getItem('token'))
        latitude = JSON.parse(localStorage.getItem('Latitude'))
        longitude = JSON.parse(localStorage.getItem('Longitude'))
        this.state = {
            "latitude": latitude,
            "longitude": longitude
        };
        this.getCurrentPosition = this
            .getCurrentPosition
            .bind(this);
    }

    async componentDidMount() {
        this.getCurrentPosition();
    }

    async getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        let lat = coordinates.coords.latitude;
        let lng = coordinates.coords.longitude;
        latitude = lat;
        longitude = lng;
        localStorage.setItem('Latitude', JSON.stringify(lat));
        localStorage.setItem('Longitude', JSON.stringify(lng));
    }

    watchPosition() {
        const wait = Geolocation.watchPosition({}, (position, err) => {})
    }

    render() {
        return (
            <IonPage>
            </IonPage>
        )
    }
}

export default getCurrentLocation;