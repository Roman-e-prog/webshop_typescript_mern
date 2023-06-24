import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from '../pages/stripe/Checkout';
import { Elements } from '@stripe/react-stripe-js';//allows us to pass in the clientSecret and stripePromise

const Container = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background:var(--white);
    margin-top:20px;
`;

const Pay = (props:{amount:string})=>{
  //stripe
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = React.useState<any>(null);
 

  //stripe
  const amountInCent = parseFloat(props.amount)  * 100;
  console.log(amountInCent);
  useEffect(() => {
    fetch("http://localhost:5001/api/checkout/config", {
    }).then(async (r)=>{
      const {publishableKey} = await r.json();
      setStripePromise(loadStripe(publishableKey));
    })
  }, [])
  // //create-paymentIntent
  useEffect(()=>{
    fetch("http://localhost:5001/api/checkout/create-payment-intent", {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInCent,
      })
    }).then(async (r)=>{
      const {clientSecret} = await r.json();
      setClientSecret(clientSecret);
    })
  }, [amountInCent])
 
  return (
    
    <Container>
        {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout/>
        </Elements>
      )}
    </Container>
  );
}

export default Pay
