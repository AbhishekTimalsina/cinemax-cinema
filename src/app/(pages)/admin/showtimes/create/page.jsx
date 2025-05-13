"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMovies, postNewShowTime } from "@/lib/movie-data";
import { ShowTimeForm } from "@/components/admin/showtime-form";

export default function CreateShowtimePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((res) => setMovies(res));
  }, []);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await postNewShowTime(formData);

      router.push("/admin/showtimes");
    } catch (error) {
      console.error("Error creating showtime:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create New Showtime
        </h1>
      </div>

      <ShowTimeForm
        isSubmitting={isSubmitting}
        movies={movies}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
