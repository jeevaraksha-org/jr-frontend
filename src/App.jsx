/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**App page**/

/*Description:
The App.js file helps in routing to all the pages which are present in the
application.
*/

/*Page import statements*/
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonRouterOutlet, IonSplitPane, IonPage} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home'
import otp from './pages/otp'
import RegistrationDetailsPage from './pages/RegistrationDetailsPage'
import SignIn from './pages/SignIn'
import Loginotp from './pages/Loginotp'
import UserHomePage from './pages/UserHomePage'
import LoadingPage from './pages/LoadingPage'
import PersonalInformation from './pages/user/PersonalInformation'
import MedicalHistory from './pages/user/MedicalHistory'
import FAQ from './pages/user/FAQ'
import UserHome from './pages/user/UserHome'
import About from './pages/user/About'
import Todaystip from './pages/user/Todaystip'
import MapContainer from './pages/user/MapContainer'
import UserExpert from './pages/user/UserExpert'
import UserExpertSearch from './pages/user/UserExpertSearch'
import Thankyou from './pages/user/Thankyou'
import TermsAndConditions from './pages/user/TermsAndConditions'
import Terms from './pages/user/Terms'
import CheckUser from './components/CheckUser'
import LocationService from './pages/user/Location'
import getCurrentLocation from './pages/user/getCurrentLocation'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import UserMenuPage from './components/UserMenuPage';

class App extends React.Component {

    render() {
        return (
            <IonPage>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <UserMenuPage/>
                        <IonRouterOutlet id="main">
                            <Route path="/UserHome" component={UserHome} exact={true}/>
                            <Route exact path="/" render={() => <Redirect to="/CheckUser"/>}/>
                            <Route path="/home" component={Home} exact={true}/>
                            
                            <Route path="/otp" component={otp} exact={true}/>
                            <Route path="/Loginotp" component={Loginotp} exact={true}/>
                            <Route path="/SignIn" component={SignIn} exact={true}/>
                            <Route
                                path="/RegistrationDetailsPage"
                                component={RegistrationDetailsPage}
                                exact={true}/>  
                            <Route path="/LoadingPage" component={LoadingPage} exact={true}/>
                            <Route path="/UserHomePage" component={UserHomePage} exact={true}/>
                            <Route path="/UserExpertSearch" component={UserExpertSearch} exact={true}/>
                            <Route
                                path="/PersonalInformation"
                                component={PersonalInformation}
                                exact={true}/>
                            <Route path="/UserExpert" component={UserExpert} exact={true}/>
                            <Route path="/MedicalHistory" component={MedicalHistory} exact={true}/>
                            <Route path="/MapContainer" component={MapContainer} exact={true}/>
                            <Route path="/TodaysTip" component={Todaystip} exact={true}/>
                            <Route path="/FAQ" component={FAQ} exact={true}/>
                            <Route path="/About" component={About} exact={true}/>
                            <Route path="/Thankyou" component={Thankyou} exact={true}/>
                            <Route path="/TermsAndConditions" component={TermsAndConditions} exact={true}/>
                            <Route path="/Terms" component={Terms} exact={true}/>
                            <Route path="/CheckUser" component={CheckUser} exact={true}/>
                            <Route path="/LocationService" component={LocationService} exact={true}/>
                            <Route path="/getCurrentLocation" component={getCurrentLocation} exact={true}/>
                        </IonRouterOutlet>
                    </IonSplitPane>

                </IonReactRouter>
            </IonPage>
        )
    }
}

export default App;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/