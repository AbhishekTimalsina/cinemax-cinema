"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BookingProgress from "@/components/booking/booking-progress";
import PaymentForm from "@/components/booking/payment-form";
import PaymentConfirmation from "@/components/booking/payment-confirmation";
import OrderSummary from "@/components/booking/order-summary";
import { getMovieById, getSeatById, postBookTicket } from "@/lib/movie-data";
import { use } from "react";
import LoadingSpinner from "@/components/utils/loading-spinner";
import ErrorMessage from "@/components/utils/error";

export default function PaymentPage({ params }) {
  params = use(params);

  const router = useRouter();
  const searchParams = useSearchParams();
  const seatId = searchParams.get("seatId");
  const seatsParam = searchParams.get("seats");
  const [showSeats, setShowSeats] = useState(null);

  const selectedSeats = seatsParam ? seatsParam.split(",") : [];
  const movieId = params.id;

  const [paymentStep, setPaymentStep] = useState("details");
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    phone: "",
  });
  const [movie, setMovie] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getSeatById(seatId || "0").then((res) => setShowSeats(res));
    getMovieById(movieId).then((res) => setMovie(res));
  }, []);

  if (selectedSeats.length === 0) {
    return <ErrorMessage msg="You have not selected any seats" />;
  }

  if (movie.length == 0 || !showSeats) {
    return <LoadingSpinner />;
  }

  if (showSeats.error) {
    return <ErrorMessage msg={showSeats.error} />;
  }

  if (movie.error) {
    return <ErrorMessage msg={movie.error} />;
  }

  const handleFormSubmit = (data) => {
    setFormData(data);
    setPaymentStep("confirmation");
  };
  const handleConfirmPayment = () => {
    setIsSubmitting(true);
    postBookTicket(seatId, movieId, selectedSeats, formData).then((data) => {
      router.push(
        `/movie/${movieId}/booking/confirmation?bookingId=${data._id}`
      );
      // setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto sm:px-4 lg:px-6 px-8 py-8">
        <BookingProgress currentStep={3} />

        <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
          <div className="col-span-2 md:col-span-1">
            {paymentStep === "details" ? (
              <PaymentForm onSubmit={handleFormSubmit} />
            ) : (
              <PaymentConfirmation
                formData={formData}
                onBack={() => setPaymentStep("details")}
                onConfirm={handleConfirmPayment}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          <div className="col-span-1">
            <OrderSummary
              movie={movie}
              showSeats={showSeats}
              selectedSeats={selectedSeats}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
