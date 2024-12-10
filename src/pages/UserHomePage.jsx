/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**UserHome page**/

/*Description:
The UserHome page contains various pages through which the user can navigate
through.
*/

/*Page import statements*/
import {IonHeader, IonToolbar, IonButtons, IonMenuButton} from '@ionic/react';
import React from 'react';
import '../pages/Home.css';

class UserHomePage extends React.Component {
    render() {
        return (
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton menu="main-menu"></IonMenuButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        );
    };
}

export default UserHomePage;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
