
import CheckOutForm from './CheckOutForm'
import '../src/Stripe.css'
import  { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';




const stripePromise = loadStripe("pk_test_51P1AQISJP765TakGJNkvpU7b04wYsUOve1qTFvx7YZlBiG6ys4iPqZrTd2omJBzPHsVLl00YQYme8SFu16DUk43Q00f5SR8S4D")
// stripe component starts here
function StripeCheckout() {
const [clientSecret,setClientSecret]=useState("");
const currentOrder= useSelector(state=>state.order.currentOrder)

useEffect(()=>{
  fetch("http://localhost:3001/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId:currentOrder._id }),
  
  })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
      
},[])

const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};


  return (
    <div className="Stripe">
    {clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckOutForm />
      </Elements>
    )}
  </div>
  )
}

export default StripeCheckout