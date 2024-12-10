/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Terms page**/

/*Description:
This is the Terms page. The Terms and Conditions page contains information about
the terms and conditions of the application which the user can read while signing
up.
*/

/*Page import statements*/
import React from "react";
import {
    IonPage,
    IonCol,
    IonGrid,
    IonContent,
    IonRow,
    IonTitle,
    IonIcon,
    IonItem
} from "@ionic/react";
import {Link} from 'react-router-dom';
import {arrowUndoOutline} from 'ionicons/icons'

class Terms extends React.Component {
    render() {
        return (
            <IonPage>
                <IonContent className="Contents">
                    <IonGrid>
                        <IonRow>
                            <IonCol size="2">
                                <Link to="/Home">
                                    <IonIcon
                                        size="large"
                                        style={{
                                        marginTop: "0.7rem"
                                    }}
                                        icon={arrowUndoOutline}></IonIcon>
                                </Link>
                            </IonCol>
                            <IonCol size="10">
                                <IonTitle
                                    className="Header Allpagesheading"
                                    style={{
                                    marginTop: "0.5rem",
                                    paddingLeft: "0rem"
                                }}
                                    color="success">Terms of Use</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <div style={{padding: "0.8rem"}}>
                    <IonItem lines="none">
                        <IonTitle className="contBod tandc">
                            <b>Declaration</b>
                        </IonTitle>
                    </IonItem>
                    <IonItem lines="none">
                        <p 
                            className="contBod"
                            align="justify">
                            I understand that the Karnataka State Government has implemented the ‘Karnataka
                            Good Samaritan and Medical Professional(Protection and Regulation during
                            Emergency Situation) 2018 act. I understand that the most important right given
                            to a Good Samaritan is the exemption from civil and criminal liability for any
                            act done to save the life and property of the victim. A Good Samaritan cannot be
                            compelled to file an FIR or pay for any charges for the treatment of the victim
                            and cannot be compelled to stay at the Police Station or Hospital nor give any
                            information regarding the identity of the victim, his own identity, or any other
                            evidence regarding the accident.
                        </p>
                    </IonItem>
                        <IonTitle className="contBod tandc">
                            <b>Karnataka Samaritan act 2018</b>
                        </IonTitle>
                    <IonItem lines="none">
                        <h5
                            className="contBod"
                            style={{
                            marginBottom: "0rem",
                            marginTop: "0rem"
                        }}>
                            <b>Karnataka Good Samaritan And Medical Professional (Protection And Regulation
                                During Emergency Situation) 2018-</b>
                        </h5>
                    </IonItem>
                    <IonItem lines="none">
                        <p
                            className="contBod"
                            align="justify"
                            style={{
                            marginBottom: "0rem"
                        }}>
                            A Good Samaritan shall not be required to,-
                            <ul>
                                <li>furnish any of his own personal information such as his name, telephone
                                    number and address at the hospital including for the preparation of a
                                    medico-legal form; or</li>
                                <li>fulfil any procedure related to the admission of an injured person at a
                                    hospital; or</li>
                                <li>bear any medical expenses towards the treatment of an injured person at a
                                    hospital.</li>
                            </ul>
                        </p>
                    </IonItem>
                    <IonItem lines="none">
                        <p
                            className="contBod"
                            align="justify"
                            style={{
                            marginBottom: "0rem",
                            marginTop: "0rem"
                        }}>
                            A Good Samaritan shall not be required for examination by the police, in
                            accordance with section 9 and 10 of this Act, unless such Good Samaritan is
                            proven to be an eye-witness to the accident or incident of crime or any other
                            emergency situation: Provided that a Good Samaritan may lodge a complaint with
                            the appropriate authority as may be specified by the Government by notification,
                            for any grievance against a police officer on the grounds of harassment or
                            intimidation, and such authority shall ensure that a departmental inquiry is
                            initiated on the basis of the complaint;

                        </p>
                    </IonItem>
                    <IonItem lines="none">
                        <p
                            className="contBod"
                            align="justify"
                            style={{
                            marginBottom: "0rem",
                            marginTop: "0rem"
                        }}>
                            (a) A Good Samaritan may voluntarily provide to the hospital his own name and
                            address, the name of the injured person, if known, and shall be required to
                            provide the time and place from where he has rescued such an injured person;
                        </p>
                    </IonItem>
                    <IonItem lines="none">
                        <p
                            className="contBod"
                            align="justify"
                            style={{
                            marginBottom: "0rem",
                            marginTop: "0rem"
                        }}>
                            If the information in clause (a) is provided by the Good Samaritan, a copy
                            thereof, along with an acknowledgment of his services shall be provided to him
                            immediately for his records.
                        </p>
                    </IonItem>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

export default Terms

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/