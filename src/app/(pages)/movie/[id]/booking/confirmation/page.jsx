"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getBookingById } from "@/lib/movie-data";
import LoadingSpinner from "@/components/utils/loading-spinner";
import jsPDF from "jspdf";

export default function ConfirmationPage() {
  const [bookingData, setBookingData] = useState({});
  const searchParams = useSearchParams();

  const bookId = searchParams.get("bookingId");
  useEffect(() => {
    getBookingById(bookId).then((res) => setBookingData(res));
  }, []);

  function handleDownloadPDF() {
    let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [500, 200],
    });
    doc.setTextColor("#dc2626");
    doc.setFont(undefined, "bold");

    doc.text("Cinemax Cinema Hall", 200, 20);
    doc.setTextColor("#000000");
    doc.setFont(undefined, "normal");

    doc.text(`Movie: ${bookingData.movieId.title}`, 20, 50);
    doc.text(
      `Date & Time: ${new Date(bookingData.seatId.date).toDateString()}`,
      300,
      50
    );

    doc.text(`Booking Id: ${bookingData._id}`, 20, 70);
    doc.text(`Seats: ${bookingData.bookedSeats.join(",")}`, 20, 90);
    doc.text("Rules:", 20, 120);
    doc.text("-) You must arrive on time.", 30, 140);
    doc.text("-) You can't bring food from outside.", 30, 160);
    doc.text("-) You are not allowed to record.", 30, 180);
    doc.save("ticket.pdf");
  }
  if (Object.entries(bookingData).length == 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto sm:px-4 lg:px-6 px-8 py-12">
        <div className="bg-gray-900 p-8 rounded-lg text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400 mb-6">
            Your tickets have been booked successfully
          </p>

          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Booking Reference</h2>
              <p className="text-2xl font-mono bg-gray-700 py-2 rounded break-all">
                {bookingData._id}
              </p>
            </div>

            <div className="grid md:grid-cols-1 grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="text-gray-400 text-sm">Movie</h3>
                <p className="font-bold">{bookingData.movieId.title}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Date & Time</h3>
                <p className="font-bold flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {new Date(bookingData.seatId.date).toDateString()}
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-sm">Seats</h3>
                <p className="font-bold">{bookingData.bookedSeats.join(",")}</p>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col flex-row justify-center gap-4 mb-8">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center transition duration-300"
              onClick={handleDownloadPDF}
            >
              <Download size={18} className="mr-2" /> Download Tickets
            </button>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-red-500 hover:text-red-400 transition duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
