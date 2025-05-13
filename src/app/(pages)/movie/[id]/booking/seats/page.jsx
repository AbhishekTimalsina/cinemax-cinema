"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BookingProgress from "@/components/booking/booking-progress";
import BookingSummary from "@/components/booking/booking-summary";
import SeatSelection from "@/components/booking/seat-selection";

import { getMovieById, getSeatById } from "@/lib/movie-data";
import { use } from "react";
import LoadingSpinner from "@/components/utils/loading-spinner";
export default function SeatsPage({ params }) {
  const [movie, setMovie] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState({});
  params = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  // const showtimeId = searchParams.get("showtime");
  const seatId = searchParams.get("seatId");

  let movieId = params.id;

  useEffect(() => {
    getMovieById(movieId).then((res) => setMovie(res));
    getSeatById(seatId || "0").then((res) => setShowSeats(res));
  }, []);

  if (!movie || Object.keys(showSeats).length == 0) {
    return <LoadingSpinner />;
  }

  const handleSeatSelect = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;

    router.push(
      `/movie/${movieId}/booking/payment?seatId=${seatId}&seats=${selectedSeats.join(
        ","
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto sm:px-4 lg:px-6 px-8 py-8">
        <BookingProgress currentStep={2} />

        <BookingSummary movie={movie} showSeats={showSeats} compact={true} />

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Select Your Seats</h2>
          <SeatSelection
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
            showSeats={showSeats}
          />
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Movie:</span>
            <span>{movie.title}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Date & Time:</span>
            <span>
              {new Date(showSeats.date).toDateString()}, {showSeats.time}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Seats:</span>
            <span>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "None selected"}
            </span>
          </div>
          <div className="flex justify-between mb-2 font-bold">
            <span>Total:</span>
            <span>
              {selectedSeats.length > 0
                ? `$${(selectedSeats.length * 10).toFixed(2)}`
                : "$0.00"}
            </span>
          </div>
          <button
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
            className={`w-full mt-4 py-3 rounded-lg font-bold ${
              selectedSeats.length > 0
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            } transition duration-300`}
          >
            {selectedSeats.length > 0
              ? "Proceed to Payment"
              : "Select seats to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
