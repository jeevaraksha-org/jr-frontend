/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Medical History page**/

/*Description:
This is the Medical History page. If the user is having any of the medical
conditions then the user needs to click on which ever health condition is applicable.
*/

/*Page import statements*/
import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonTitle,
    IonCheckbox,
    IonInput,
    IonToast
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import UserHomePage from '../UserHomePage';

/*Page import statements*/
var auth_token;
var medical;
var data1 = "";
var data_list = [];
var objData;
var fieldTitle = '';

class MedicalHistory extends React.Component {

    constructor() {
        super()
        auth_token = JSON.parse(localStorage.getItem('token'))
        medical = JSON.parse(localStorage.getItem('UserMed'))
        this.state = {
            "Asthma": false,
            "Diabetes": false,
            "AnxietyDisorder": false,
            "HighBloodPressure": false,
            "LowBloodPressure": false,
            "HeartDisease": false,
            "KidneyDisease": false,
            "RespiratoryDisease": false,
            "HIV": false,
            "allergies": "",
            "allmed": ""
        }
        this.Medupdt = this
            .Medupdt
            .bind(this);
    }

    onAsthama = () => {
        this.setState(initialState => ({
            Asthma: !initialState.Asthma
        }));
    }

    onDiabetes = () => {
        this.setState(initialState => ({
            Diabetes: !initialState.Diabetes
        }));
    }

    onAnxiety = () => {
        this.setState(initialState => ({
            AnxietyDisorder: !initialState.AnxietyDisorder
        }));
    }

    onHighbp = () => {
        this.setState(initialState => ({
            HighBloodPressure: !initialState.HighBloodPressure
        }));
    }

    onLowbp = () => {
        this.setState(initialState => ({
            LowBloodPressure: !initialState.LowBloodPressure
        }));
    }

    onHeartdis = () => {
        this.setState(initialState => ({
            HeartDisease: !initialState.HeartDisease
        }));
    }

    onKidmeydis = () => {
        this.setState(initialState => ({
            KidneyDisease: !initialState.KidneyDisease
        }));
    }

    onRespdis = () => {
        this.setState(initialState => ({
            RespiratoryDisease: !initialState.RespiratoryDisease
        }));
    }

    onHiv = () => {
        this.setState(initialState => ({
            HIV: !initialState.HIV
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.Medupdt();
    }

    /*Method to update the Medical History records of the user*/
    updState = () => {
        data1 = JSON.parse(localStorage.getItem('UserMed'))
        objData = Object
            .values(data1)
            .map((el) => {
                return data_list.push(el);
            });
        data_list.map((item) => {
            if (item.Asthma === true) {
                this.setState({Asthma: true})
            }
            if (item.Diabetes === true) {
                this.setState({Diabetes: true})
            }
            if (item.AnxietyDisorder === true) {
                this.setState({AnxietyDisorder: true})
            }
            if (item.HighBloodPressure === true) {
                this.setState({HighBloodPressure: true})
            }
            if (item.LowBloodPressure === true) {
                this.setState({LowBloodPressure: true})
            }
            if (item.HeartDisease === true) {
                this.setState({HeartDisease: true})
            }
            if (item.KidneyDisease === true) {
                this.setState({KidneyDisease: true})
            }
            if (item.RespiratoryDisease === true) {
                this.setState({RespiratoryDisease: true})
            }
            if (item.HIV === true) {
                this.setState({HIV: true})
            }
            this.setState({allergies: item.allergies})
            this.setState({allmed: item.allmed})
        })

    }

    componentDidMount() {
        this.updState()
    }

    handleToast() {
        this.setState({
            show: !this.state.show
        });
    }

    /*Method to Submit the Medical History Records*/
    Medupdt() {
        let data = this.state;
        fetch('https://www.jrapp.tech/api/user/medhist-user/', {
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
                        fieldTitle = "Data updated"
                        this.handleToast()
                    }
                })
                .catch(error => {
                    console.log("Registration not done", error);
                });
        })
    }

    render()
    {
        console.log(medical)
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
                                    color="success">Medical History</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>

                        <IonItem>
                            <IonLabel className="contBod">Asthma</IonLabel>
                            <IonCheckbox checked={this.state.Asthma} onIonChange={this.onAsthama}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Diabetes</IonLabel>
                            <IonCheckbox checked={this.state.Diabetes} onIonChange={this.onDiabetes}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Anxiety Disorder</IonLabel>
                            <IonCheckbox checked={this.state.AnxietyDisorder} onIonChange={this.onAnxiety}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">High Blood Pressure</IonLabel>
                            <IonCheckbox
                                checked={this.state.HighBloodPressure}
                                onIonChange={this.onHighbp}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Low Blood Pressure</IonLabel>
                            <IonCheckbox checked={this.state.LowBloodPressure} onIonChange={this.onLowbp}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Heart Disease</IonLabel>
                            <IonCheckbox checked={this.state.HeartDisease} onIonChange={this.onHeartdis}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Kidney Disease</IonLabel>
                            <IonCheckbox checked={this.state.KidneyDisease} onIonChange={this.onKidmeydis}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">Respiratory Disease</IonLabel>
                            <IonCheckbox
                                checked={this.state.RespiratoryDisease}
                                onIonChange={this.onRespdis}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod">HIV</IonLabel>
                            <IonCheckbox checked={this.state.HIV} onIonChange={this.onHiv}/>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod" position="floating">Allergies</IonLabel>
                            <IonInput
                                value={this.state.allergies}
                                onIonChange={(data) => {
                                this.setState({allergies: data.target.value})
                            }}></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel className="contBod" position="floating">Allergic to Medicines</IonLabel>
                            <IonInput
                                value={this.state.allmed}
                                onIonChange={(data) => {
                                this.setState({allmed: data.target.value})
                            }}></IonInput>
                        </IonItem>

                    </IonList>

                    <p>
                        <IonButton
                            className="names"
                            color="success"
                            onClick={this.onSubmit}
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

export default MedicalHistory;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/