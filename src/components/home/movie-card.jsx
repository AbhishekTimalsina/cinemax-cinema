import Link from "next/link";
import { Clock, Calendar } from "lucide-react";

export default function MovieCard({ movie, buttonText, buttonAction }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-[400px]">
        <img
          src={movie.image}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
        <p className="text-gray-400 mb-2">{movie.genre}</p>
        <div className="flex items-center text-gray-400 mb-4">
          <Clock size={16} className="mr-1" />
          <span className="mr-3">{movie.duration}</span>
          <Calendar size={16} className="mr-1" />
          <span>{movie.releaseDate}</span>
        </div>

        {buttonAction === "book" ? (
          <Link
            href={`/movie/${movie._id}/booking`}
            className="block w-full bg-red-600 hover:bg-red-700 text-center text-white font-bold py-2 rounded transition duration-300"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            className="block w-full bg-gray-700 text-center text-white font-bold py-2 rounded cursor-not-allowed opacity-70"
            disabled
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
