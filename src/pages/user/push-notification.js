/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Push notifications page**/

/*Description:
This is the Push notifications page. The Push notifications page sends the push 
notifications to the user.
*/

/*Page import statements*/
import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAKhXB-9_tUfdqfwilsidyrYhiXq9C3-CI",
    authDomain: "jeevaraksha-app.firebaseapp.com",
    databaseURL: "https://jeevaraksha-app.firebaseio.com",
    projectId: "jeevaraksha-app",
    storageBucket: "jeevaraksha-app.appspot.com",
    messagingSenderId: "997318802312",
    appId: "1:997318802312:web:7567b1e5822aed6856583d",
    measurementId: "G-VC17ZFN0J7"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('User token:', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  /** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/