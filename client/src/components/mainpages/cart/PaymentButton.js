import React from 'react';
// import PaypalExpressBtn from 'react-paypal-express-checkout';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import envVariables from "../../../utils/env-variables.json";

const PaymentButton = (props) => {
    const { tranSuccess, total } = props;
    const onSuccess = (payment) => {
        if(payment){
            console.log("The payment was succeeded!", payment);
        tranSuccess(payment);
        }
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        console.log("Error!", err);
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state

    const client = {
        sandbox: `${envVariables['sandbox-APP-ID']}`,
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    let style = {
        size: 'small',
        color: 'blue',
        shape: 'rect',
        label: 'checkout',
        tagline: false
    }

    return (
        <PayPalScriptProvider options={{ "client-id": `${envVariables['sandbox-APP-ID']}` }}>
            <PayPalButtons 
             env={env} client={client} total={total} currency={currency}
            style={style} onCancel={onCancel} onError={onError} onClick={()=>onSuccess()}/>
        </PayPalScriptProvider>
        // <PaypalExpressBtn
        //     env={env} client={client}
        //     currency={currency}
        //     total={total} onError={onError}
        //     onSuccess={onSuccess} onCancel={onCancel}
        //     style={style} />
    );
}

export default PaymentButton;