"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getMovieById, putUpdateMovie } from "@/lib/movie-data";
import MovieForm from "@/components/admin/movie-form";

export default function EditMoviePage({ params }) {
  params = use(params);
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const movieId = params.id;

  useEffect(() => {
    (async () => {
      const fetchedMovie = await getMovieById(movieId);

      if (fetchedMovie) {
        setMovie(fetchedMovie);
        setIsLoading(false);
      } else {
        // Handle movie not found
        router.push("/admin/movies");
      }
    })();
  }, [movieId]);
  // console.log(movie);
  const handleSubmit = async (movieData) => {
    setIsSubmitting(true);

    try {
      putUpdateMovie(movieId, movieData);
      router.push("/admin/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-red-600 border-gray-700 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading movie data...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white">Movie not found</h2>
        <p className="mt-2 text-gray-400">
          The movie you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Edit Movie: {movie.title}
        </h1>
      </div>

      <MovieForm
        movie={movie}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
