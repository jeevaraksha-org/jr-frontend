/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Sign In page**/

/*Description:
This is the User Sign up Page where the user needs to plug in their mobile number.
It also contains a link to the Terms and conditions page if the User wants to read
through it. If the User is already signed Up but hs logged off the application or
deleted the app but the decides to install the app again, then the user needs to
sign in before making use of the services.
*/

/*Page import statements*/
import {
    IonContent,
    IonToast,
    IonPage,
    IonList,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
    IonTitle
} from '@ionic/react';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import {Plugins} from '@capacitor/core';
const {Geolocation} = Plugins;

/*Global variables*/
var fieldTitle = ''
var MissingTitles = ''

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "phone": ""
        }
        this.getCurrentPosition = this
            .getCurrentPosition
            .bind(this);
    }

    async componentDidMount() {
        this.getCurrentPosition();
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

    refreshPage() {
        window
            .location
            .reload();
    }

    /*On submit functionality along with validations*/
    Signinsubmit() {
        let data = this.state;
        if (!this.state.phone) {
            fieldTitle = "Phone number cannot be empty"
            MissingTitles = "Phone number"
            this.handleToast()
        }
        if (this.state.phone) {
            if (this.state.phone.length < 10) {
                fieldTitle = "Phone number must contain 10 digits"
                this.handleToast()
            }
            if (this.state.phone.length === 10) {
                var regex = /^\d{10}$/
                var result = regex.test(this.state.phone)
                if (result === false) {
                    fieldTitle = "Phone number can contain only digits(0-9)"
                    this.handleToast()
                }
            }
        }
        if (result === true) {
            fetch('https://www.jrapp.tech/api/user/login-send-otp/', {
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
                                .push({pathname: '/Loginotp'});
                            this.refreshPage();
                        } else {
                            fieldTitle = "Phone number is not registered"
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
            <IonPage >
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
                    </IonList>

                    <IonButton
                        onClick={() => {
                        this.Signinsubmit()
                    }}
                        className="names"
                        color="success"
                        style={{
                        width: "15rem",
                        fontSize: "1rem"
                    }}>SIGN IN</IonButton>

                    <h6>
                        <p className="names">Not a User?
                            <Link className="tag" to="/Home">
                                <b>
                                    SIGN UP</b>
                            </Link>
                        </p>
                    </h6>
                <div style={{paddingTop: "1rem"}}>        
                    <IonTitle
                        className="Header"
                        style={{
                        fontSize: "35px"
                    }}>
                        <b className="color">J</b>eeva<b className="color">R</b>aksha</IonTitle>
                    <IonTitle className="Header ComHeader" color="success">Saving Lives,Assuring Care</IonTitle>
                </div>
                    <IonToast
                        isOpen={this.state.show}
                        onDidDismiss={() => this.handleToast()}
                        message={fieldTitle}
                        duration={3000}/>

                </IonContent>
            </IonPage>
        );
    }
}

export default SignIn;
