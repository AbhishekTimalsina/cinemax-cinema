import Image from "next/image";
import { Clock } from "lucide-react";

export default function MovieDetails({ movie }) {
  return (
    <div className="w-1/3 lg:w-full">
      {/* <div className="md:w-1/3"> */}
      <div className="relative h-[450px] w-full md:w-[300px] mx-auto">
        <img
          src={movie.image}
          alt={movie.title}
          className="object-cover rounded-lg h-full w-full"
        />
      </div>
      <div className="mt-6 bg-gray-900 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <div className="flex items-center text-gray-400 mb-4">
          <Clock size={16} className="mr-1" />
          <span className="mr-3">{movie.duration}</span>
          <span className="mr-3">|</span>
          <span>{movie.genre}</span>
        </div>
        <p className="text-gray-300 mb-4">{movie.description}</p>
        <div className="mb-2">
          <span className="text-gray-400">Director:</span> {movie.director}
        </div>
        <div>
          <span className="text-gray-400">Cast:</span> {movie.cast}
        </div>
      </div>
    </div>
  );
}
