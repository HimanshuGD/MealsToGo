import React from "react";
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import { cardTokenRequest } from '../../../services/checkout/checkout.service';
// import { exp } from "react-native-reanimated";
export const CreditCardInput = ({ name, onSuccess, onError }) => {
    const onChange = async (formData) => {
        const { values, status } = formData;
        const isIncomplete = Object.values(status).includes("incomplete");
        // console.log(isIncomplete);
        const expiry = values.expiry.split("/");
        // console.log(expiry);
        const card = {
            number: values.number,
            exp_month: expiry[0],
            exp_year: expiry[1],
            cvc: values.cvc,
            name: name,
        };
        if (!isIncomplete) {
            // const info = await cardTokenRequest(card);
            // onSuccess(info);
            try {
                const info = await cardTokenRequest(card);
                onSuccess(info);
            } catch (e) {
                onError();
            }
        }
    };
    return <LiteCreditCardInput onChange={onChange} />;
};


