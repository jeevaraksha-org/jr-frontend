/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Sign In OTP page**/

/*Description:
This is the Sign In OTP page where the user needs to plug in the OTP sent to their
mobile number. If the user does not receive the otp, then the user can click on the
resend otp option and the user will receive the otp again.
*/

/*Page import statements*/
import {
    IonContent,
    IonPage,
    IonList,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
    IonIcon,
    IonTitle,
    IonToast,
    IonNote,
    IonRow,
    IonCol
} from '@ionic/react';
import React from 'react';
import {Link} from 'react-router-dom';
import {arrowUndoOutline} from 'ionicons/icons'
import {Otp} from 'react-otp-timer';
import './Home.css';

/*Global variables*/
var fieldTitle = ''
var MissingTitles = ""
var phone;

class Loginotp extends React.Component {

    constructor(props) {
        super(props);
        phone = JSON.parse(localStorage.getItem('phone'))
        this.state = {
            "otp": "",
            "phone": phone
        }
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

    /*Method to Resend the otp if the user does not receive the otp*/
    resendOtp() {
        let data = this.state;
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
                        fieldTitle = "OTP Re-sent"
                        this.handleToast();
                    }
                })
                .catch(error => {
                    console.log("Invalid number", error);
                });
        })
    }

    /*Method to validate the otp*/
    otpsubmit() {
        if (!this.state.otp) {
            fieldTitle = "OTP field cannot be empty"
            MissingTitles = "Phone number"
            this.handleToast()
        }
        if (this.state.otp.length === 4) {
            var regex = /^\d{4}$/
            var result = regex.test(this.state.otp)
            if (result === false) {
                fieldTitle = "OTP can contain only digits(0-9)"
                this.handleToast()
            } else {
                console.log("1", this.state)
                let data = this.state;
                fetch('https://www.jrapp.tech/api/user/login-receive-otp/', {
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
                                let token = resp.auth_token;
                                localStorage.setItem('token', JSON.stringify(token));
                                this
                                    .props
                                    .history
                                    .push({pathname: '/UserHome'});
                                this.refreshPage();
                            } else {
                                fieldTitle = "Invalid OTP"
                                this.handleToast()
                            }
                        })
                        .catch(error => {
                            console.log("Invalid number", error);
                        });
                })
            }
        }
    }

    render() {
        let style = {
            otpTimer: {
                margin: '0px',
                color: '#e0455f',
                fontSize: "0.9rem",
                paddingTop: "1rem"
            },
            resendBtn: {
                backgroundColor: 'white',
                color: '#6e2c69',
                border: '1 px solid #ccc'
            }
        }

        return (
            <IonPage >
                <Link to="/SignIn">
                    <IonIcon
                        size="large"
                        style={{
                        marginTop: "1.37rem"
                    }}
                        icon={arrowUndoOutline}></IonIcon>
                </Link>
                <IonContent className="Contents">
                    <IonTitle className="OtpHeader ComHeader" color="success">OTP Verify</IonTitle>
                    <IonNote className="names">Enter 4 digit code sent to {phone}</IonNote>
                    <IonList>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">OTP</IonLabel>
                            <IonInput
                                maxlength={4}
                                inputMode="tel"
                                clearInput={true}
                                value={this.state.otp}
                                onIonChange={(data) => {
                                this.setState({otp: data.target.value})
                            }}></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton
                        onClick={() => {
                        this.otpsubmit()
                    }}
                        className="names"
                        color="success"
                        style={{
                        width: "15rem"
                    }}>VERIFY</IonButton>

                    <IonRow>
                        <IonCol size="3"></IonCol>
                        <IonCol size="6">
                            <a className="tag" target="_blank" rel="noopener noreferrer">Didn't get the OTP?</a>
                            <Otp style={style} minutes={1} // Minutes ( Pass the no of minutes that you want count )
                                resendEvent={this
                                .resendOtp
                                .bind(this)} //  Resend button event you can pass your function name here
                            />
                        </IonCol>

                        <IonCol size="3"></IonCol>
                    </IonRow>
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

export default Loginotp;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/