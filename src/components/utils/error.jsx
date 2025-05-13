import Link from "next/link";

export default function ErrorMessage({ msg = "Something went wrong." }) {
  return (
    <section className="w-full flex flex-col items-center gap-4 mt-[25vh]">
      <div className="text-2xl">{msg}</div>
      <div>
        <Link href="/" className="text-lg bg-red-600 px-3 py-1 rounded">
          Go to home
        </Link>
      </div>
    </section>
  );
}
