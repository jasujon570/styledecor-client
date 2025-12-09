import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ service, closeModal }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const createBookingAndIntent = (bookingData) => {
    setProcessing(true);
    axiosSecure
      .post("/bookings", bookingData)
      .then((res) => {
        const bookingId = res.data.bookingId;

        axiosSecure
          .post("/payment/create-intent", { price: service.cost })
          .then((res) => {
            setClientSecret(res.data.clientSecret);
            setProcessing(false);
            Swal.fire(
              "Booking Created!",
              "Proceed with payment to confirm.",
              "info"
            );
          })
          .catch((err) => {
            console.error(err);
            setProcessing(false);
            Swal.fire("Error", "Failed to fetch payment gateway.", "error");
          });
      })
      .catch((err) => {
        setProcessing(false);
        Swal.fire("Error", "Failed to create booking.", "error");
      });
  };

  const handlePayment = async (data) => {
    setProcessing(true);
    setCardError("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(`Confirmation Failed: ${confirmError.message}`);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        bookingId: data.bookingId,
        transactionId: paymentIntent.id,
        price: service.cost,
        paymentMethod: "Card",
        paymentDate: new Date(),
      };

      axiosSecure.post("/payment/confirm", paymentData).then((res) => {
        Swal.fire(
          "Payment Confirmed!",
          `Transaction ID: ${paymentIntent.id}`,
          "success"
        );
        closeModal();
      });
    }
    setProcessing(false);
  };

  const handleBookingSubmit = (data) => {
    if (!clientSecret) {
      const bookingData = {
        serviceId: service._id,
        serviceName: service.service_name,
        cost: service.cost,
        bookingDate: data.bookingDate,
        location: data.location,
      };
      createBookingAndIntent(bookingData);
    } else {
      handlePayment(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleBookingSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Service:</span>
        </label>
        <input
          type="text"
          defaultValue={service.service_name}
          readOnly
          className="input input-bordered bg-gray-100"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Cost:</span>
        </label>
        <input
          type="text"
          defaultValue={`${service.cost} BDT`}
          readOnly
          className="input input-bordered bg-gray-100"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Booking Date</span>
        </label>
        <input
          type="date"
          className="input input-bordered"
          {...register("bookingDate", { required: true })}
        />
        {errors.bookingDate && (
          <span className="text-error text-sm">Booking date is required</span>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Location/Venue Address</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Full address"
          {...register("location", { required: true })}
        />
        {errors.location && (
          <span className="text-error text-sm">Location is required</span>
        )}
      </div>

      <div
        className={`mt-6 p-4 border rounded-lg ${
          clientSecret ? "border-success" : "border-gray-300"
        }`}
      >
        <h3 className="font-semibold mb-3">Payment Information</h3>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {cardError && <p className="text-error mt-2">{cardError}</p>}

      <div className="modal-action mt-6">
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={processing || !stripe || !elements}
        >
          {processing ? (
            <span className="loading loading-spinner"></span>
          ) : clientSecret ? (
            `Pay ${service.cost} BDT`
          ) : (
            "Book & Get Payment Link"
          )}
        </button>
      </div>
    </form>
  );
};

const BookingModal = ({ service, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-primary">
          Book Decoration Service
        </h3>
        <p className="py-4">
          Service: {service.service_name} | Cost: {service.cost} BDT
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm service={service} closeModal={onClose} />
        </Elements>

        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
