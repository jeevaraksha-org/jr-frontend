/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Menu page**/

/*Description:
The User Menu page is loaded when the user logs into the application.
*/

/*Page import statements*/
import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonToggle,
    IonButton
} from '@ionic/react';

import React from 'react';
import {useLocation} from 'react-router-dom';
import {
    helpCircleSharp,
    personCircleSharp,
    notificationsCircleSharp,
    homeSharp,
    moon,
    fitnessSharp,
    readerSharp,
    arrowUndoCircleSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
    url : string;
    iosIcon : string;
    title : string;
}

const appPages : AppPage[] = [
    {
        title: 'Home',
        url: '/UserHome',
        iosIcon: homeSharp
    }, {
        title: 'Personal Information',
        url: '/PersonalInformation',
        iosIcon: personCircleSharp
    }, {
        title: 'Medical History',
        url: '/MedicalHistory',
        iosIcon: fitnessSharp
    }, {
        title: 'About Us',
        url: '/About',
        iosIcon: notificationsCircleSharp
    }, {
        title: 'FAQ',
        url: '/FAQ',
        iosIcon: helpCircleSharp
    }, {
        title: 'Terms and Conditions',
        url: '/TermsAndConditions',
        iosIcon: readerSharp
    }
];

const UserMenuPage : React.FC = () => {
    const location = useLocation();

    const [value] = React.useState(localStorage.getItem('username'));

    const toggleDarkModeHandler = () => {
        document
            .body
            .classList
            .toggle("dark");
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/CheckUser"
    };

    return (
        <IonMenu
            menuId="main-menu"
            id="test"
            swipe-gesture="false"
            contentId="main"
            type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader
                        style={{
                        fontSize: "30px"
                    }}>
                        <b className="color contHead">J</b>eeva<b className="color contHead">R</b>aksha</IonListHeader>
                    <IonNote className="Note contBod">
                        Saving Lives, Assuring Care
                    </IonNote>
                    <IonNote
                        className="usrname"
                        style={{
                        display: "block",
                        fontFamily: "Lora1"
                    }}>{value}</IonNote>
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={location.pathname === appPage.url
                                    ? 'selected'
                                    : ''}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}>
                                    <IonIcon slot="start" icon={appPage.iosIcon}/>
                                    <IonLabel className="MenuInfo">{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonItem>
                    <IonIcon slot="start" icon={moon}/>
                    <IonLabel className="components">Dark Mode</IonLabel>
                    <IonToggle name="darkMode" onIonChange={toggleDarkModeHandler}/>
                </IonItem>

                <IonItem>
                    <IonIcon slot="start" icon={arrowUndoCircleSharp}/>
                    <IonLabel className="components" onClick= {() => logout()}>Logout</IonLabel>
                </IonItem>
            </IonContent>
        </IonMenu>
    );
};

export default UserMenuPage;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/