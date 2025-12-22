import { useLocation } from "react-router-dom";
import { FaLock, FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-error">Payment Error!</h2>
        <p className="mt-4">No booking information found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-10 flex items-center justify-center gap-4">
        <FaCreditCard /> Secure Payment
      </h1>

      <div className="max-w-3xl mx-auto bg-base-100 p-6 md:p-8 rounded-xl shadow-2xl border-t-4 border-secondary">
        <h2 className="text-2xl font-bold mb-6 text-secondary border-b pb-2">
          Order Summary
        </h2>

        <div className="space-y-4 mb-8 text-lg">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-semibold text-right">
              {booking.serviceName}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 text-xl font-bold text-primary">
            <span>Total Payable:</span>
            <span>{booking.cost.toLocaleString()} BDT</span>
          </div>
        </div>

        <div className="divider text-gray-400 text-sm italic">
          <FaLock className="inline mr-2" /> Encrypted Payment Details
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
