import Image from "next/image";

export default function OrderSummary({ movie, showSeats, selectedSeats }) {
  const ticketPrice = 10;
  const totalAmount = selectedSeats.length * 10;

  return (
    <div className="bg-gray-900 p-6 rounded-lg sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex  mb-4">
        <img
          src={movie.image}
          alt={movie.title}
          width={60}
          height={90}
          className="rounded mr-3"
        />
        <div>
          <h3 className="font-bold">{movie.title}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(showSeats.date).toDateString()}, {showSeats.time}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Seats:</span>
          <span>{selectedSeats.join(", ")}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Tickets:</span>
          <span>
            {selectedSeats.length} × ${ticketPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
