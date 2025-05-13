import Image from "next/image";

export default function BookingSummary({ movie, showSeats }) {
  return (
    <div className="flex md:flex-col flex-row items-center gap-4 mb-8 bg-gray-900 p-4 rounded-lg py-3">
      <img
        src={movie.image}
        alt={movie.title}
        width={80}
        height={120}
        className="rounded"
      />
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-xl font-bold">{movie.title}</h1>
        <p className="text-gray-400">
          {new Date(showSeats.date).toDateString()} | {showSeats.time}
        </p>
      </div>
    </div>
  );
}
