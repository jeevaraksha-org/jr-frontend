/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Thank you page**/

/*Page import statements*/
import React from 'react'
import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonTitle,
    IonNote,
    IonFooter
} from '@ionic/react';

var Username;

class Thankyou extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": Username
        }

    }

    render() {

        return (
            <IonPage>
                <IonContent className="Contents">
                    <IonTitle className="Header he" color="success">Thank You</IonTitle>
                    <IonNote></IonNote>
                    <IonList>
                        <IonItem lines="none">
                            <p
                                style={{
                                fontFamily: "monospace"
                            }}
                                align="justify">You
                                have just saved a life! We appreceiate your efforts. Keep saving lifes and
                                making it a better place to live.
                            </p>
                        </IonItem>

                        <IonItem
                            lines="none"
                            style={{
                            marginLeft: "-1rem"
                        }}>
                            <IonLabel className="tha">
                                "<b>It's all about saving Lives</b>"</IonLabel>
                        </IonItem>
                    </IonList>

                    <IonTitle
                        className="Header typHeader"
                        style={{
                        fontSize: "40px"
                    }}>
                        <b className="color">J</b>eeva<b className="color">R</b>aksha</IonTitle>
                </IonContent>
                <IonFooter></IonFooter>
            </IonPage>
        )
    }
}

export default Thankyou

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
