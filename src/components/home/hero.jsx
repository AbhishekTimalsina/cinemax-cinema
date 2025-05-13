"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero({ movie }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrentSlideIndex((cur) => {
        if (cur == movie.length - 1) {
          return 0;
        }
        return cur + 1;
      });
    }, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex h-[70vh]  overflow-hidden relative">
      {movie.map((m, i) => {
        return (
          <section
            className="absolute h-full w-full shrink-0 transition-all duration-700"
            style={{
              transform: `translate(${(i - currentSlideIndex) * 100}%,${0}px)`,
            }}
            data-cur={currentSlideIndex}
            key={i}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
            <img
              src={m.image}
              alt="Featured movie"
              className="object-cover opacity-60 w-full h-full"
            />
            <div className="absolute bottom-0 left-0 z-20 md:p-8 p-16 w-full">
              <h1 className="md:text-4xl text-5xl font-bold mb-2">{m.title}</h1>
              <p className="md:text-xl text-xl mb-6 w-11/12">{m.description}</p>
              <Link
                href={`/movie/${m._id}/booking`}
                className="bg-red-600 hover:bg-red-700 text-white font- bold py-3 px-8 rounded-md transition duration-300"
              >
                Book Tickets
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
