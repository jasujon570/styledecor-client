import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import {
  FaCreditCard,
  FaMoneyCheckAlt,
  FaServicestack,
  FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const PaymentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: booking = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payment-booking", id],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/my-bookings/${user?.email}`);
      const found = res.data.find((item) => item._id === id);
      if (!found) throw new Error("Booking not found");
      return found;
    },
  });

  const handlePayNow = async () => {
    if (!booking) return toast.error("Booking data missing!");

    const toastId = toast.loading("Processing Payment...");

    const paymentData = {
      bookingId: id,
      transactionId: `TXN-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 5)
        .toUpperCase()}`,
      price: booking?.price || booking?.cost || 0,
      email: user?.email,
      userName: user?.displayName,
      serviceName: booking?.serviceName,
      paymentDate: new Date(),
      status: "paid",
    };

    try {
      const res = await axiosSecure.post("/payment", paymentData);

      if (res.data.insertedId) {
        toast.success("Payment Successful!", { id: toastId });

        navigate("/dashboard/payment-history");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      const msg = error.response?.data?.message || "Payment failed. Try again.";
      toast.error(msg, { id: toastId });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !booking)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-error">Something went wrong!</h2>
        <button onClick={() => navigate(-1)} className="btn btn-outline mt-4">
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen">
      <h2 className="text-4xl font-black text-secondary mb-10 flex items-center gap-3">
        <FaCreditCard /> Complete Payment
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-3">
              <FaServicestack className="text-primary" /> Service Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">
                  Service Name
                </p>
                <p className="text-lg font-semibold">{booking?.serviceName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">
                  Booking Date
                </p>
                <p className="text-lg font-semibold">{booking?.bookingDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 uppercase font-bold">
                  Venue Location
                </p>
                <p className="text-lg font-semibold">{booking?.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-secondary sticky top-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-3">
              <FaMoneyCheckAlt className="text-secondary" /> Payment Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>
                  {(booking?.price || booking?.cost || 0).toLocaleString()} BDT
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (0%):</span>
                <span>0 BDT</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between items-center text-xl font-black text-secondary">
                <span>Total:</span>
                <span>
                  {(booking?.price || booking?.cost || 0).toLocaleString()} BDT
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300 mb-8">
              <p className="text-xs text-center text-gray-500 italic">
                Secure transaction powered by Stripe & SSLCommerz
              </p>
            </div>

            <button
              onClick={handlePayNow}
              disabled={booking?.paymentStatus === "paid"}
              className={`btn btn-secondary btn-lg w-full text-white font-black shadow-lg hover:scale-105 transition-transform ${
                booking?.paymentStatus === "paid" && "btn-disabled"
              }`}
            >
              {booking?.paymentStatus === "paid"
                ? "Already Paid"
                : "Confirm Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
