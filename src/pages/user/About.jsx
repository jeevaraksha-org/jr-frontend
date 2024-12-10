/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**About Us page**/

/*Description:
This is the About us page. The about us page contains information about 
the organisation, platform and the devlopers.
*/

/*Page import statements*/
import {
    IonContent,
    IonPage,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle
} from '@ionic/react';
import React from 'react';
import '../Home.css';
import UserHomePage from '../UserHomePage';
import ReadMoreAndLess from 'react-read-more-less';

class About extends React.Component {

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
                                    marginTop: "0.5rem",
                                    paddingLeft: "0rem"
                                }}
                                    color="success">About Us</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>
                        <div
                            align="justify"
                            className="oneandhalf contBod"
                            style={{
                            wordWrap: "break-word"
                        }}>
                            <h5>
                                <b>The Organisation</b>
                            </h5>
                            <p>JeevaRaksha Trust is a special purpose vehicle created by Rajiv Gandhi
                                University of Health Sciences, Karnataka and Swami Vivekananda Youth Movement to
                                roll out ‘Certified Skill Courses’ in Emergency Care equipping doctors, nurses,
                                paramedics and lay public with necessary skills. This will transform the
                                Emergency Care response system and thus save lives. The three objectives of
                                JeevaRaksha Trust are Education and training specifically in Emergency Care
                                &amp; Life Support, Research &amp; Development and Relief Activity.</p>
                            
                            <h5>
                                <b>The Platform</b>
                            </h5>
                            <p>In India, emergency medical care has until recently been a neglected area of
                                expertise. In recent times, emergency transport through 108 ambulance service
                                has been scaled up rapidly. However, there has not been a commensurate
                                improvement in skills of health care providers and public safety professional
                                and citizen volunteers in emergency life support skills.</p>

                            <ReadMoreAndLess
                                ref={this.ReadMore}
                                className="read-more-content"
                                charLimit={0}
                                readMoreText="Read more"
                                readLessText="Read less">

                                This unmet need is barely met by a few institutions which either teach curricula
                                developed in western countries that are expensive, specialty focus and often not
                                reflective of Indian needs, or curriculum developed locally which are not
                                standardized and accredited by statutory bodies. To address this gap, in June
                                2014, JeevaRaksha program was initiated collaboratively by Karnataka State
                                Health University - Rajiv Gandhi University of Health Sciences (RGUHS), and
                                Swami Vivekananda Youth Movement, Mysuru in technical collaboration with
                                University of Utah, USA. The team conducted needs assessment among primary
                                healthcare centres and other providers (including private sector) who are the
                                first point of contact in the health care system in medical and trauma
                                emergencies. This stressed on the need of the curricula to be broad based and
                                address all common emergencies that they encounter, viz, Cardiac, Respiratory,
                                Obstetric, Paediatric including Neonates, Trauma, Burns, Poisoning including
                                animal and insect Bites. JeevaRaksha course focuses on recognizing and managing
                                critical illness that are common in Indian setting as mentioned above. This is
                                not only India’s first Comprehensive Emergency Care and Life Support Training
                                Course for medical doctors (for both primary practitioners and specialists) but
                                also the FIRST University recognized Emergency Care Skills Certificate program
                                in the World. The program was formally inaugurated on 23rd June 2014 by the then
                                Honourable Governor of Karnataka Dr Hansraj Bhardwaj and was attended by Dr
                                Vedprakash Mishra, the then Chairman of Academic Committee of Medical Council of
                                India. The Course was piloted in Morocco and Uzbekistan too. This helped us
                                understand that the courses are not only equally relevant to the context of
                                Other Asian, African and East European nations but also perceived their hunger
                                for the same. Thus, RGUHS-JeevaRaksha Program has the potential to be exported
                                to other developing countries as an Indian model Rajiv Gandhi University of
                                Health Sciences along with Swami Vivekananda Youth Movement created JeevaRaksha
                                Trust as a special purpose vehicle to rapidly scale up the program across
                                Karnataka and India while maintaining the highest standards of quality
                                education, research and training.

                            </ReadMoreAndLess>

                            <h5>
                                <b>The Developers</b>
                            </h5>
                                <p>Archit Jha , Rajath S Bhardwaj , Mohit R Chugh , Samaresh Panda</p>
                                <p>Email Id: arms4product@gmail.com</p>
                        </div>
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}

export default About;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/