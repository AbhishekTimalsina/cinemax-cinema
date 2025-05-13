"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MovieForm from "@/components/admin/movie-form";
import { postNewMovie } from "@/lib/movie-data";

export default function CreateMoviePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (movieData) => {
    setIsSubmitting(true);

    try {
      await postNewMovie(movieData);

      router.push("/admin/movies");
    } catch (error) {
      console.error("Error creating movie:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add New Movie
        </h1>
      </div>

      <MovieForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
