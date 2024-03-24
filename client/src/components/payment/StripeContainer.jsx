import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { CheckoutForm } from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51OHoTbIglv0gLbYIOeFbdYTTUwiZEJ7OGH8UALsl9bf7f2HoQEdvYJe0BAQfuEldJI7G0ftaqi0MkUutT9MNtLlZ006swaGDD6";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const options = {
    mode: "payment",
    amount: parseInt(props.totalPrice),
    currency: "usd",
    id: "",
  };
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm
        totalPrice={props.totalPrice}
        toggleShowPM={props.toggleShowPM}
      />
    </Elements>
  );
}
