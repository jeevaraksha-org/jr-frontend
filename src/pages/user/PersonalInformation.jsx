/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Personal information page**/

/*Description:
This is the Personal Information page where the user needs to fill 
in the basic details along with the required fields which is filled
in the registration page.
*/

/*Page import statements*/
import {
    IonContent,
    IonDatetime,
    IonPage,
    IonList,
    IonInput,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonTitle,
    IonSelectOption,
    IonSelect,
    IonToast
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import UserHomePage from '../UserHomePage';

/*Global variables*/
var auth_token;
var user;
var EmailFlag;
var PinFlag;
var fieldTitle = ''

const test = {
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

class PersonalInformation extends React.Component {
    constructor() {
        super()
        auth_token = JSON.parse(localStorage.getItem('token'))
        user = JSON.parse(localStorage.getItem('Userdata'))
        let fn = user.USER_FIRST_NM;
        let mn = user.USER_MIDDLE_NM;
        let ln = user.USER_LAST_NM;
        let gen = user.USER_GENDER;
        let econtact = user.USER_EMERGENCY_NO;
        let bg = user.USER_BLOOD_GROUP;
        let dob = user.USER_DOB;
        let eid = user.USER_EMAIL;
        let add1 = user.USER_ADDR1;
        let add2 = user.USER_ADDR2;
        let cty = user.USER_CITY;
        let ste = user.USER_STATE;
        let con = user.USER_COUNTRY;
        let pin = user.USER_PINCODE;

        this.state = {
            "phone": "",
            "firstname": fn,
            "middlename": mn,
            "lastname": ln,
            "gender": gen,
            "emergencycontact": econtact,
            "bloodgroup": bg,
            "dateofbirth": dob,
            "email": eid,
            "addr1": add1,
            "addr2": add2,
            "city": cty,
            "state": ste,
            "country": con,
            "pincode": pin
        };
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    /*Method to Submit the user Personal Information along with validations*/
    personInfoSubmit() {
        if (!this.state.email) {
            fieldTitle = "Email field cannot be left blank"
            this.handleToast()
        }
        if (this.state.email) {
            var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            var result = regex.test(this.state.email)
            if (result === false) {
                fieldTitle = "Enter a valid Email"
                this.handleToast()
            }
            if (result === true) {
                EmailFlag = true;
            }
        }
        if (!this.state.pincode) {
            fieldTitle = "Pincode field cannot be left blank"
            this.handleToast()
        }
        if (this.state.pincode) {
            if (this.state.pincode.length < 6) {
                fieldTitle = "Pin Code must contain 6 digits"
                this.handleToast()
            }
            if (this.state.pincode.length === 6) {
                var regex = /^\d{6}$/
                var result = regex.test(this.state.pincode)
                if (result === false) {
                    fieldTitle = "Enter a valid Pin Code"
                    this.handleToast()
                }
                if (result === true) {
                    PinFlag = true;
                }
            }
        }
        if (EmailFlag && PinFlag) {
            let data = this.state;
            fetch('https://www.jrapp.tech/api/user/update-user/', {
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
                            fieldTitle = "Information Saved"
                            this.handleToast();
                        }
                    })
                    .catch(error => {
                        console.log("Registration not done", error);
                    });
            })
        }
    }

    render() {
        return (
            <IonPage >
                <IonContent className="Contents">
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
                                    paddingLeft: "0rem"
                                }}
                                    color="success">Personal Info</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">First Name</IonLabel>
                            <IonInput
                                value={this.state.firstname}
                                onIonChange={(data) => {
                                this.setState({firstname: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Middle Name</IonLabel>
                            <IonInput
                                value={this.state.middlename}
                                onIonChange={(data) => {
                                this.setState({middlename: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Last Name</IonLabel>
                            <IonInput
                                value={this.state.lastname}
                                onIonChange={(data) => {
                                this.setState({lastname: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Gender</IonLabel>
                            <IonSelect
                                okText="Submit"
                                value={this.state.gender}
                                onIonChange={(data) => {
                                this.setState({gender: data.target.value})
                            }}>
                                <IonSelectOption value="M">Male</IonSelectOption>
                                <IonSelectOption value="F">Female</IonSelectOption>
                                <IonSelectOption value="O">Other</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Blood Group</IonLabel>
                            <IonSelect value={this.state.bloodgroup}onIonChange={(data) => {
                                this.setState({bloodgroup: data.target.value})
                            }}okText="Submit">
                                <IonSelectOption value="A+">A +</IonSelectOption>
                                <IonSelectOption value="A-">A -</IonSelectOption>
                                <IonSelectOption value="B+">B +</IonSelectOption>
                                <IonSelectOption value="B-">B -</IonSelectOption>
                                <IonSelectOption value="O+">O +</IonSelectOption>
                                <IonSelectOption value="O-">O -</IonSelectOption>
                                <IonSelectOption value="AB+">AB +</IonSelectOption>
                                <IonSelectOption value="AB-">AB -</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Email</IonLabel>
                            <IonInput
                                value={this.state.email}
                                onIonChange={(data) => {
                                this.setState({email: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Date of Birth (yyyy-mm-dd)</IonLabel>
                            <IonDatetime
                                value={this.state.dateofbirth}
                                onIonChange={(data) => {
                                this.setState({dateofbirth: data.target.value})
                            }}
                                displayFormat="YYYY-MM-DD"
                                min="1900-01-01"
                                max="2030-31-12"></IonDatetime>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Address Line 1</IonLabel>
                            <IonInput
                                value={this.state.addr1}
                                onIonChange={(data) => {
                                this.setState({addr1: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Address Line 2</IonLabel>
                            <IonInput
                                value={this.state.addr2}
                                onIonChange={(data) => {
                                this.setState({addr2: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">City</IonLabel>
                            <IonInput
                                value={this.state.city}
                                onIonChange={(data) => {
                                this.setState({city: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">State</IonLabel>
                            <IonInput
                                value={this.state.state}
                                onIonChange={(data) => {
                                this.setState({state: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Country</IonLabel>
                            <IonInput
                                value={this.state.country}
                                onIonChange={(data) => {
                                this.setState({country: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Pin Code</IonLabel>
                            <IonInput
                                value={this.state.pincode}
                                onIonChange={(data) => {
                                this.setState({pincode: data.target.value})
                            }}></IonInput>
                        </IonItem>
                    </IonList>

                    <p>
                        <IonButton
                            className="names"
                            onClick={() => {
                            this.personInfoSubmit()
                        }}
                            color="success"
                            style={{
                            width: "15rem",
                            fontSize: "1rem"
                        }}>SAVE</IonButton>
                    </p>

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

export default PersonalInformation;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/