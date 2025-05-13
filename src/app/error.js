"use client";

import Link from "next/link";

export default function Error() {
  return (
    <section className="w-full flex flex-col items-center gap-4 mt-[25vh]">
      <div className="text-2xl">{"Unexpected Error in message."}</div>
      <div>
        <Link href="/" className="text-lg bg-red-600 px-3 py-1 rounded">
          Go to home
        </Link>
      </div>
    </section>
  );
}
