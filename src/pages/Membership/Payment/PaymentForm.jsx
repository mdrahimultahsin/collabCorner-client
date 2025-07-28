import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";
import {toast} from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useNavigate} from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const {error} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      toast.error(error.message);
      setProcessing(false);
    } else {
   
      setProcessing(false);
    }
    const amountInCents = 500 * 100;
    //create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
      userEmail: user?.email,
    });
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (result.error) {
      setErrorMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful");
        setSuccess(true);
        await axiosSecure
          .patch("/users/badges", {email: user?.email})
          .then(() => {
            navigate("/membership");
          });
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px 14px",
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
          <CardElement options={cardStyle} />
        </div>

        {errorMessage && (
          <div className="text-red-600 text-sm font-medium">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-sm font-medium">
            {successMessage}
          </div>
        )}

        <button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50 cursor-pointer"
          type="submit"
          disabled={!stripe || processing || success}
        >
          {processing
            ? "Processing..."
            : success
            ? "Payment Successful"
            : "Pay for Membership"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
