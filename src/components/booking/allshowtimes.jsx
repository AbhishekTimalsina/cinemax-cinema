"use client";

import { getShowTimesByMovie } from "@/lib/movie-data";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../utils/loading-spinner";

export default function AllShowTimes({ movieId }) {
  const [showTime, setShowTime] = useState([]);
  const [currentShowTime, setCurrentShowTime] = useState({
    name: "Today",
    value: new Date(),
  });

  useEffect(() => {
    getShowTimesByMovie(movieId).then((res) => {
      if (res == null) {
        setShowTime({ error: "No Shows Available for this movie currently" });
        return;
      }
      setShowTime(res);
    });
  }, []);

  let allShowDate = [];

  new Array(5).fill(null).map((_, i) => {
    let dateData = {};
    let date = new Date(Date.now() + 24 * 60 * 60 * 1000 * i);
    dateData["value"] = date;
    if (new Date(date).toDateString() == new Date().toDateString()) {
      dateData["name"] = "Today";
    } else if (
      new Date(date).toDateString() ==
      new Date(Date.now() + 24 * 60 * 60 * 1000 * 1).toDateString()
    ) {
      dateData["name"] = "Tomorrow";
    } else {
      dateData["name"] = new Date(date).toDateString().slice(0, 10);
    }
    allShowDate.push(dateData);
  });

  let filteredShows = showTime?.availableShows?.filter(
    (show) =>
      new Date(show.date).toDateString() ==
      new Date(currentShowTime.value).toDateString()
  );

  return (
    <>
      <div className="mb-8">
        <div className="flex overflow-x-auto gap-4 pb-4">
          {allShowDate.map((date, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-4 py-3 rounded-lg cursor-pointer transition duration-300 ${
                currentShowTime.name == date.name
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setCurrentShowTime(date)}
            >
              <div className="text-center">
                <Calendar size={16} className="mx-auto mb-1" />
                <span>{date.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CinemaShowtimes
        showtimes={showTime.hasOwnProperty("error") ? showTime : filteredShows}
        // showTimes={showTimes.availableShows}
        movieId={movieId}
      />
    </>
  );
}

function CinemaShowtimes({ showtimes, movieId }) {
  if (showtimes?.hasOwnProperty("error")) {
    return <div className=" text-xl pt-6">{showtimes.error}</div>;
  }
  if (showtimes?.length == 0) {
    return (
      <div className=" text-xl pt-6">No Shows Available for this date</div>
    );
  }
  if (!showtimes) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {showtimes?.map((showtime) => (
          <Link
            key={showtime._id}
            href={`/movie/${movieId}/booking/seats?seatId=${showtime.seatsId}`}
            className="bg-gray-800 hover:bg-gray-700 text-center py-4 px-2 rounded-lg transition duration-300"
          >
            <div className="font-bold">{showtime.time}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
