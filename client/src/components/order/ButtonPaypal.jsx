import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import clientAxios from "../../api";

export default function ButtonPaypal(props) {
  const convertToUSD = (props.totalPrice / 24000).toFixed(2);
  const initialOptions = {
    amount: { currency_code: "USD", value: convertToUSD },
    clientId:
      "ASIcnemiilSVJN9_jvLtf7Y3YuzGmXXKO5hLTdJyIjOqXAi-y7hybE8wqIU1k9k1lKQyahQzWq-mLZRV",
    currency: "USD",
    intent: "capture",
  };

  const handlePayment = () => {};

  return (
    <div>
      <button />
    </div>
  );
}
