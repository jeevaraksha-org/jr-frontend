/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* Copyright © 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Frequently Asked Questions page**/

/*Description:
This is the Frequently Asked Questions page. The Frequently Asked Questions page contains
information about the general questions about the application.
*/

/*Page import statements*/
import React from 'react'
import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonItem,
    IonCardContent,
    IonCard,
    IonList
} from '@ionic/react';
import UserHomePage from '../UserHomePage';
import '../Home.css'

class FAQ extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "phone": "",
            selectedQuestion: -1
        };
        this.openQuestion = this
            .openQuestion
            .bind(this);
    }

    /*Method on click of checking each FAQs individually */
    getFaqs() {
        // some service returning a list of FAQs
        const faqs = [
            {
                question: 'Why use JeevaRaksha App for emergency care support?',
                answer: 'The first few minutes are precious in an emergency and make a difference between' +
                        ' complete recovery vs being permanently damaged or arriving dead at the hospital' +
                        '. Hence, engaging with a certified Emergency care Professional (Doctor, Nurse, P' +
                        'aramedic, certified emergency care provider) improves the chance of recovery on ' +
                        'reaching hospital.'
            }, {
                question: 'Is it not better to call for an ambulance and depend on paramedics?',
                answer: 'It is important to call an ambulance right away if the situation demands. Most of' +
                        ' the times, ambulances provide only a ‘scoop and run’ service. A JeevaRaksha prov' +
                        'ider can make life saving interventions at the incident site, supported by senior' +
                        ' medical experts located world over. Also, in city conditions, ambulances may be ' +
                        'delayed to reach the incident site. A responder can engage early and start emerge' +
                        'ncy care within 15 minutes – this is an improvement over current average time to ' +
                        'get first assistance. Hence, requesting JeevaRaksha emergency care and also calli' +
                        'ng an ambulance would be more beneficial.'
            }, {
                question: 'How qualified are the responders?',
                answer: 'JeevaRaksha is a Rajiv Gandhi University of Health Sciences affiliated organisat' +
                        'ion and provides university certified emergency care programs. The JeevaRaksha' +
                        ' providers are mostly doctors, other health care professionals or citizen voluntee' +
                        'rs. They are qualified to provide first response and will arrange for safe transf' +
                        'er to a hospital.'
            }, {
                question: 'Why take this service and involve JeevaRaksha certified responder?',
                answer: 'JeevaRaksha’s emergency response care is free, provides a qualified person and i' +
                        's a strong potential contributor to the patient’s improved recovery. All medical ' +
                        'recommendations point to importance of resuscitation and early first response as ' +
                        'a key factor for better recovery.'
            }, {
                question: 'What are the costs or charges involved?',
                answer: 'The JeevaRaksha App is a free download, there are no charges for using services o' +
                        'f a first responder. First responders are professional volunteers who are offeri' +
                        'ng free service whenever they are in the area and able to travel to site of assi' +
                        'stance within the stipulated time.'
            }, {
                question: 'Who makes the decision of hospitalisation and who bears the cost of hospitalisat' +
                        'ion?',
                answer: 'The first responder reaching the site, provides emergency care and advices patien' +
                        't or by stander about their condition and recommends hospital visit only if requi' +
                        'red. The decision of accepting the advice for further medical assistance, choice ' +
                        'of doctor or hospital is entirely up to the patient or his by stander. The cost of' +
                        ' hospitalisation or for further medical treatment is not borne by JeevaRaksha. J' +
                        'eevaRaksha is a not for profit organisation restricted to providing volunteers fo' +
                        'r emergency first response.'
            }, {
                question: 'Is there a current or future cost involved for using the App?',
                answer: 'The JeevaRaksha App is free for download and for use. No money is charged or rece' +
                        'ived by JeevaRaksha from any participant in the process. Hence, there is no bias ' +
                        'or preference for ambulance or doctor or hospital.'
            }, {
                question: 'Will the certified responder choose the hospital if hospitalisation is required?',
                answer: 'No, if services of hospital or doctor for further treatment is recommended, then' +
                        ' it is the choice of the patient or his family or the people providing assistanc' +
                        'e at the site. The first responder may identify nature of emergency and suggest ' +
                        'what specialists are required for handling this case. This might help select an ' +
                        'appropriate government or private hospital.'
            }, {
                question: 'Will JeevaRaksha use the app data for profitable purposes?',
                answer: 'JeevaRaksha will not use data for profitable purposes. The organisation will kee' +
                        'p patient data confidential. Anonymised data could be used for research purposes' +
                        ' to improve emergency care planning and provision.'
            }, {
                question: "Do hospitals or doctors pay for patient's hospital visits?",
                answer: 'JeevaRaksha is a ‘Not for Profit’ organisation and does not seek or accept fees ' +
                        'or payments for patients’ hospital visits.'
            }
        ];
        return faqs;
    }

    openQuestion(index) {
        this.setState({
            selectedQuestion: (this.state.selectedQuestion === index
                ? -1
                : index)
        });
    }

    render() {
        const faqs = this.getFaqs();
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
                                    color="success">FAQ's</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>
                        {faqs.length && faqs.map((item, index) => (
                            <div
                                key={`item-${index}`}
                                className={`item ${this.state.selectedQuestion === index
                                ? 'open'
                                : ''}`}>
                                <IonCard>
                                    <IonItem className='question' onClick={() => this.openQuestion(index)}>
                                        {item.question}
                                    </IonItem>

                                    <IonCardContent className='answer' align="justify">
                                        {item.answer}
                                    </IonCardContent>
                                </IonCard>

                            </div>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}

export default FAQ

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/