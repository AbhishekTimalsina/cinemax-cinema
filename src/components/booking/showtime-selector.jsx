import Link from "next/link";

import AllShowTimes from "./allshowtimes";

export default async function ShowtimeSelector({ movieId }) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">
        Select Showtime
      </h2>

      <AllShowTimes movieId={movieId} />
    </div>
  );
}

// {
//   showtimes.map((showtime) => (
//     <Link
//       key={showtime.id}
//       href={`/movies/${movieId}/booking/seats?showtime=${showtime.id}`}
//       className="bg-gray-800 hover:bg-gray-700 text-center py-4 px-2 rounded-lg transition duration-300"
//     >
//       <div className="font-bold">{showtime.time}</div>
//       {/* <div className="text-sm text-gray-400">{showtime.theater}</div> */}
//     </Link>
//   ));
// }
