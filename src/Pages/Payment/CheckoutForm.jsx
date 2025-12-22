import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (booking?.cost > 0) {
      axiosSecure
        .post("/payment/create-intent", { price: booking.cost })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Payment Intent Error:", error);
          const apiMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message;
          toast.error(apiMessage || "Failed to initialize payment. Please try again.");
        });
    }
  }, [booking?.cost, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || processing) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);
    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      console.log("[Payment Method Error]", methodError);
      toast.error(methodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          bookingId: booking._id || booking.serviceId,
          transactionId: paymentIntent.id,
          price: booking.cost,
          paymentMethod: "card",
          paymentDate: new Date(),
        };

        try {
          const res = await axiosSecure.post(
            "/payment/confirm",
            paymentInfo
          );
          if (res.data.transactionId) {
            toast.success("Payment Successful!");
            navigate("/dashboard/my-bookings");
          }
        } catch (confirmErr) {
          console.error("Confirmation Error:", confirmErr);
          const apiMessage =
            confirmErr?.response?.data?.message ||
            confirmErr?.response?.data?.error ||
            confirmErr?.message;
          toast.error(
            apiMessage || "Payment succeeded but failed to update database."
          );
        }
      }
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 bg-base-100 rounded-xl shadow-md border"
    >
      <h4 className="text-xl font-bold mb-4 text-center">
        Complete Your Payment
      </h4>

      <div className="border p-4 rounded-lg bg-white mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full text-white font-bold"
      >
        {processing ? (
          <span className="loading loading-spinner"></span>
        ) : (
          `Pay ${booking?.cost?.toLocaleString()} BDT`
        )}
      </button>

      {transactionId && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm text-center font-medium">
            Success! Transaction ID:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
