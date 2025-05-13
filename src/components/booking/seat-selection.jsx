"use client";

export default function SeatSelection({
  selectedSeats,
  onSeatSelect,
  showSeats,
}) {
  const theaterLayout = generateTheaterLayout(showSeats);
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-center gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-800 rounded-sm mr-2"></div>
          <span>Taken</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-3/4 h-8 bg-gray-700 rounded-t-3xl mb-8 text-center text-sm text-gray-400 flex items-center justify-center">
          SCREEN
        </div>

        <div className="min-w-[600px]">
          {theaterLayout.map((row) => (
            <div key={row.row} className="flex items-center mb-2">
              <div className="w-8 text-center font-bold">{row.row}</div>
              <div className="flex flex-1 justify-center gap-1">
                {row.seats.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.isTaken}
                    onClick={() => onSeatSelect(seat.id)}
                    className={`w-8 h-8 rounded-t-md flex items-center justify-center text-xs ${
                      seat.isTaken
                        ? "bg-gray-800 cursor-not-allowed"
                        : selectedSeats.includes(seat.id)
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <div className="w-8 text-center font-bold">{row.row}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateTheaterLayout(showSeats) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;

  const layout = rows.map((row) => {
    const seats = Array.from({ length: seatsPerRow }, (_, i) => {
      const seatNumber = i + 1;
      const seatId = `${row}${seatNumber}`;

      return {
        id: seatId,
        row,
        number: seatNumber,
        isTaken: showSeats.bookedSeats.includes(seatId),
      };
    });

    return {
      row,
      seats,
    };
  });

  return layout;
}
