import React from 'react';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styled from 'styled-components';

const Form = styled.form`
  width:80%;
  margin:0 auto;
  border: 1px solid var(--coffee);
  background: var(--white);
  padding:20px;
`;
const Paybutton = styled.button`
    width:200px;
    padding:10px;
    background:var(--coffee);
    color:var(--white);
    border:none;
    cursor: pointer;
    box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-webkit-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
-moz-box-shadow: -2px 4px 13px -3px rgba(0,0,0,0.67);
`;
export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Paybutton disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Bezahlen"}
        </span>
      </Paybutton>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </Form>
  );
}
