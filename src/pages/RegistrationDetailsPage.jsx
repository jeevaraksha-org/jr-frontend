/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Registrations Details page**/

/*Description:
This is the Registrations Details page where the user needs to fill in a few details
which are mandratory fields like First name, last name, Emergency contact number, etc.
The user will not be allowed to move to the home page without filling the required
fields.
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
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonDatetime,
    IonSelectOption,
    IonSelect,
    IonToast
} from '@ionic/react';
import {arrowUndoOutline} from 'ionicons/icons'
import {Link} from 'react-router-dom';

/*Global variables*/
var fieldTitle = ''
var MissingTitles = ""

class RegistrationDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        let phone = JSON.parse(localStorage.getItem('phone'))
        this.state = {
            "phone": phone,
            "firstname": "",
            "middlename": "",
            "lastname": "",
            "gender": "",
            "emergencycontact": "",
            "bloodgroup": "",
            "dateofbirth": "",
            "show": false
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

    /*Method to submit the required details along with validations*/
    formsubmit() {
        if (!(this.state.firstname && this.state.lastname && this.state.emergencycontact && this.state.bloodgroup && this.state.gender && this.state.dateofbirth)) {
            fieldTitle = "Required Fields cannot be Empty"
            this.handleToast()
        } else {
            if (!this.state.firstname) {
                fieldTitle = "First name cannot be empty"
                MissingTitles = "First name"
                this.handleToast()
            }
            if (!this.state.lastname) {
                fieldTitle = "Last name cannot be empty"
                MissingTitles.concat("Last Name")
                this.handleToast()
            }
            if (!this.state.emergencycontact) {
                fieldTitle = "Emergency Contact Number cannot be empty"
                this.handleToast()
            }
            if (!this.state.bloodgroup) {
                fieldTitle = "Blood Group cannot be empty"
                this.handleToast()
            }
            if (!this.state.gender) {
                fieldTitle = "Gender cannot be empty"
                this.handleToast()
            }
            if (!this.state.dateofbirth) {
                fieldTitle = "Date of Birth cannot be empty"
                this.handleToast()
            }
        }
        if (this.state.emergencycontact) {
            if (this.state.emergencycontact.length < 10) {
                fieldTitle = "Emergency contact number must contain 10 digits"
                this.handleToast()
            }
            if (this.state.emergencycontact.length === 10) {
                var regex = /^\d{10}$/
                var result = regex.test(this.state.emergencycontact)
                if (result === false) {
                    fieldTitle = "Emergency contact number can contain only digits(0-9)"
                    this.handleToast()
                }
            }
        }
        if (result === true) {
            let data = this.state;
            fetch('https://www.jrapp.tech/api/user/register-user/', {
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
                            <IonCol size="1">
                                <Link to="/Home">
                                    <IonIcon
                                        size="large"
                                        style={{
                                        marginTop: "1.37rem"
                                    }}
                                        icon={arrowUndoOutline}></IonIcon>
                                </Link>
                            </IonCol>
                            <IonCol size="11">
                                <IonTitle
                                    className="reg"
                                    style={{
                                    marginTop: "1rem",
                                    paddingLeft: "0rem"
                                }}
                                    color="success">Registration</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">First Name*</IonLabel>
                            <IonInput
                                inputMode="text"
                                clearInput={true}
                                value={this.state.firstname}
                                onIonChange={(data) => {
                                this.setState({firstname: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Middle Name</IonLabel>
                            <IonInput
                                inputMode="text"
                                clearInput={true}
                                value={this.state.middlename}
                                onIonChange={(data) => {
                                this.setState({middlename: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Last Name*</IonLabel>
                            <IonInput
                                inputMode="text"
                                clearInput={true}
                                value={this.state.lastname}
                                onIonChange={(data) => {
                                this.setState({lastname: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Emergency Contact Number*</IonLabel>
                            <IonInput
                                inputMode="tel"
                                maxlength={10}
                                clearInput={true}
                                value={this.state.emergencycontact}
                                onIonChange={(data) => {
                                this.setState({emergencycontact: data.target.value})
                            }}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className="names" color="dark" position="floating">Blood Group*</IonLabel>
                            <IonSelect
                                okText="Submit"
                                value={this.state.bloodgroup}
                                onIonChange={(data) => {
                                this.setState({bloodgroup: data.target.value})
                            }}>
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
                            <IonLabel className="names" color="dark" position="floating">Gender*</IonLabel>
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
                            <IonLabel className="names" color="dark" position="floating">Date of Birth (YYYY-MM-DD)*</IonLabel>
                            <IonDatetime
                                inputMode="tel"
                                clearInput={true}
                                min="1900-01-01"
                                max="2030-31-12"
                                displayFormat="YYYY-MM-DD"
                                pickerFormat="YYYY-MM-DD"
                                value={this.state.dateofbirth}
                                onIonChange={(data) => {
                                this.setState({dateofbirth: data.target.value})
                            }}></IonDatetime>
                        </IonItem>

                    </IonList>

                    <p>
                        <IonButton
                            onClick={() => {
                            this.formsubmit()
                        }}
                            className="names"
                            color="success"
                            style={{
                            width: "15rem",
                            fontSize: "1rem"
                        }}>
                            SIGN UP<IonIcon></IonIcon>
                        </IonButton>
                    </p>

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

export default RegistrationDetailsPage

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/