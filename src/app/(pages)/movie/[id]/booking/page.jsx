import MovieDetails from "@/components/booking/movie-details";
import ShowtimeSelector from "@/components/booking/showtime-selector";
import { getMovieById } from "@/lib/movie-data";

import ErrorMessage from "@/components/utils/error";
import { cookies } from "next/headers";
import BookingProgress from "@/components/booking/booking-progress";

export default async function BookingPage({ params }) {
  params = await params;
  const movieId = params.id;
  // const movie = await getMovieById(movieId);
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  let movie = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${movieId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );
  movie = await movie.json();

  if (movie.error) {
    return <ErrorMessage msg={movie.error} />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full sm:px-4 lg:px-6 px-8 py-8">
      <BookingProgress currentStep={1} />
      <div className="flex md:flex-col flex-row gap-8">
        <MovieDetails movie={movie} />

        <ShowtimeSelector movieId={movieId} />
      </div>
    </div>
  );
}
