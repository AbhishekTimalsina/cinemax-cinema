import MovieSection from "@/components/home/movie-section";
import { getMovies } from "@/lib/movie-data";
import { cookies } from "next/headers";

export default async function Movies() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  data = await data.json();

  return (
    <div>
      <MovieSection
        title="Now Showing"
        movies={data.nowShowing}
        buttonText="Book Tickets"
        buttonAction="book"
      />

      <MovieSection
        title="Coming Soon"
        movies={data.commingSoon}
        buttonText="Coming Soon"
        buttonAction="disabled"
      />
    </div>
  );
}
