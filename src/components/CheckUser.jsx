/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Check User page**/

/*Description:
This is the Terms and Conditions page. The Terms and Conditions page contains information about
the terms and conditions of the application.
*/

/*Page import statements*/
import React from 'react'
import withSplashScreen from './withSplashScreen'
//import Location from '../pages/user/Location'
var phone;
var token;
var page;

class CheckUser extends React.Component {
    constructor(props) {
        super(props);
        page = JSON.parse(localStorage.getItem('UPage'))
        phone = JSON.parse(localStorage.getItem('phone'))
        token = JSON.parse(localStorage.getItem('token'))
        this.state = {
            loading: true
        };
    }

    pageMoveHome() {
        window.location.href = "/UserHome"
    }

    pageMoveSignIn() {
        window.location.href = "/Home"
    }

    pageMoveMap1() {
        window.location.href = "/UserExpertSearch"
    }

    pageMoveMap2() {
        window.location.href = "/UserExpertSearch"
    }

    render() {
        if (phone != null && token != null) {
            if (page === 'UserExpertSearch') {
                this.pageMoveMap1();
            } else if (page === 'UserExpert') {
                this.pageMoveMap2();
            } else {
                this.pageMoveHome();
            }
        } else {
            this.pageMoveSignIn();
        }
        return (
            <div className="splash-screen">
                <div className="loading-dot">
                    JR
                </div>
                <h5
                    className="names"
                    style={{
                    color: "#e0455f"
                }}>Saving Lives, Assuring Care</h5>
            </div>
        )
    }
}

export default withSplashScreen(CheckUser)

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/