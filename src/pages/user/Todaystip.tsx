import {
    IonContent,
    IonPage,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonCard,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import UserHomePage from '../UserHomePage';
import {wifi} from 'ionicons/icons'
import {askForPermissioToReceiveNotifications} from './push-notification';
import { setupConfig } from '@ionic/react';

setupConfig({
    hardwareBackButton: false
  });

class Todaystip extends React.Component {


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
                                marginTop: "1rem",
                                paddingLeft: "0rem"
                            }}
                                color="success">Today's Tip</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonButton onClick={askForPermissioToReceiveNotifications}>
                        Click here to recieve notifications
                    </IonButton>
                </IonGrid>
                <IonList>
                    <IonCard>
                        <IonItem href="#" className="ion-activated">
                            <IonIcon icon={wifi} slot="start"/>
                            <IonLabel>Card Link Item 1 activated</IonLabel>
                        </IonItem>
                    </IonCard>
                </IonList>
            </IonContent>
        </IonPage>
        );
    }
}
export default Todaystip;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/