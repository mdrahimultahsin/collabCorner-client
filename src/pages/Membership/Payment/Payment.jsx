import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const stripePromise = loadStripe(
  `${import.meta.env.VITE_Payment_Publishable_Key}`
);
const Payment = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-600">
        Become a Gold Member ✨
      </h1>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
        Unlock exclusive features, earn a Gold Badge on your profile, and stand
        out in the community. As a Gold Member, you can post unlimited content,
        access premium support, and gain more visibility!
      </p>
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-neutral-content">
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
