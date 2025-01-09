import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseCart from "../../../hooks/UseCart";
import UseAuth from "../../../hooks/UseAuth";

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError]= useState('');
    const [clientSecret, setClientSecret] =useState('');
    const [transactionId, setTransactionId]= useState();
    const axiosSecure = useAxiosSecure();
    const [cart]= UseCart();
    const {user} = UseAuth();
    const totalPrice = cart.reduce((total, item)=> total + item.price ,0);

    useEffect(()=>{
        axiosSecure.post('/create-checkout-session', {price: totalPrice})
        .then(res=>{
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure, totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!stripe && !elements){
        return
    }
     const card = elements.getElement(CardElement)
     if(card=== null){
        return
     }
     const {error, paymentMethod} =await stripe.createPaymentMethod({
        type: "card",
        card
     })
     if(error){
        console.log("Payment Error", error)
        setError(error.message)
     }
     else{
        console.log("payment Method", paymentMethod)
        setError('')
     }
     const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous"
        }
      }
     }) 
     if(confirmError){
      console.log("confirmed error",confirmError)
     }
     else{
      console.log("payment-intent", paymentIntent)
      if(paymentIntent.status === "succeeded"){
        console.log("transaction id", paymentIntent.id)
        setTransactionId(paymentIntent.id)
        // now save the payment details in the database
        const payment ={
          email: user.email,
          name: user.displayName,
          price: totalPrice,
          date: new Date(), //utc date convert
          cartID: cart?.map(item=>item._id),
          menuItemID: cart?.map(item=>item.menuId),
          
        }
      }
     }

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-700">Your transaction ID : {transactionId}</p>
      }
      </form>
    </div>
  );
};

export default CheckOutForm;
