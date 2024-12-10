/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/

/**Call page**/

/*Description:
This is the Call page. The Call page allowss the user to call the number
on a click of a button.
*/

/*Page import statements*/
import React from "react";
import { CallNumber } from "@ionic-native/call-number";
 
class Callfn extends React.Component {
  constructor(private call: typeof CallNumber) {
    super(call);
  }
 
  Dialler(phone: string) {
    const num = this.props
    CallNumber.callNumber(phone, true)
      .then((res) => console.log("Launched dialer!", res))
      .catch(() => console.log("Error launching dialer"));
  }
 
  render() {
    return this.Dialler;
  }
}
 
export default Callfn;

/** ARMS product**/
/***********************************************************************************************************
* This software has been developed free of cost and intended for public usage.                             *
* © Copyright 2020 Archit Jha, Rajath S Bharadwaj, Mohit Rajesh Chugh, Samaresh Panda. All Rights Reserved.*
* For more information write to arms4product@gmail.com.                                                    *
************************************************************************************************************/