/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**SplashScreen page**/

/*Description:
The SplashScreen page is loaded between the pages.
*/

/*Page import statements*/
import React, {Component} from 'react';
import '../components/Splash.css';

/*Global variables*/
var phone;
var token;

function LoadingMessage() {
    return (
        <div className="splash-screen">
            <div className="loading-dot">
                JR
            </div>
            <h5 className="tag" style={{
                color: "#e0455f"
            }}>Saving Lives, Assuring Care</h5>
        </div>
    );
}

function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            phone = JSON.parse(localStorage.getItem('phone'))
            token = JSON.parse(localStorage.getItem('token'))
            this.state = {
                loading: true
            };
        }

        async componentDidMount() {
            if (phone != '') 
                setTimeout(() => {
                    this.setState({loading: false});
                }, 3000)
        }

        render() {
            if (this.state.loading) 
                return LoadingMessage();
            
            // otherwise, show the desired route
            return <WrappedComponent {...this.props}/>;
        }
    };
}

export default withSplashScreen;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/