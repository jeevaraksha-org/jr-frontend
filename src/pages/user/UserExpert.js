/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**User Expert page**/

/*Description:
The User Expert displays the intial map.
*/

/*Page import statements*/
import React from 'react';
import {IonPage} from '@ionic/react';
import {withScriptjs} from "react-google-maps";
import MapContainer from './MapContainer';

const UserExpert = () => {
    const MapLoader = withScriptjs(MapContainer);

    return (
        <IonPage>
            <MapLoader defaultZoom={15}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQrRDi6PI32Wc5sEFfo4zn25b7MlbQgPM"
                loadingElement={< div style = {{ height: `100%` }}/>}> 
            </MapLoader>
        </IonPage>
    );
};

export default UserExpert

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/
