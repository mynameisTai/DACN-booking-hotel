import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import clientAxios from "../../api";
import { actions, useStore } from "../../context/order";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert, Typography } from "@material-tailwind/react";
import { Icon } from "../../common/Icon";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [idOrder, setIdOrder] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [state, dispatch] = useStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (elements == null) {
      return;
    }
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:4000/api/v1/order/stripe",
          {
            amount: parseInt(props.totalPrice * 100),
            id,
            order: state,
          }
        );

        if (response.data.success) {
          setSuccess(true);
          setIdOrder(response.data.newOrder._id);
          setShowAlert(true);
          toast({
            title: "Đơn hàng mới",
            message: `Đơn hàng mới với mã số ${response.data.newOrder._id} đã được tạo.`,
            type: "info",
            pauseOnHover: false,
          });
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  const handleCloseArlert = () => {
    setShowAlert(false);
    dispatch(actions.setClearOrder());
    dispatch(actions.setModeModal(false));
    props.toggleShowPM();
  };
  return (
    <>
      {showAlert ? (
        <Alert
          open={true}
          className="absolute max-w-screen-md bg-blue-700 h-28 z-10"
          icon={<Icon />}
          onClose={() => handleCloseArlert()}
        >
          <Typography variant="h5" color="white">
            Booking thành công
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            Đơn hàng {idOrder}
          </Typography>
        </Alert>
      ) : (
        ""
      )}
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset
            className="FormGroup"
            style={{
              backgroundColor: "#170404",
              height: 40,
              flexDirection: "column",
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
            <h3 className="mt-4 text-brown-50 ml-2 text-lg ">
              {" "}
              Total: ${parseInt(props.totalPrice)}
            </h3>
          </fieldset>
          <button className="mt-2 w-24 h-9 bg-black rounded-lg text-white float-right mr-4 ">
            Pay
          </button>
        </form>
      ) : (
        ""
      )}
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};
