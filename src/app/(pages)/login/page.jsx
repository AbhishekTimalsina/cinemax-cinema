"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.refresh();
          location.href = "/admin";
          // router.push("/admin");
          return;
        }
        setError("Incorrect Username or password");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 lg:px-6 sm:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center">
            <span className="text-red-600 font-bold text-3xl">CINEMAX</span>
            <span className="ml-2 text-white font-semibold text-xl">Admin</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login as admin
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-gray-800 py-8 sm:px-4 shadow rounded-lg px-10">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="flex flex-col  gap-2">
                <label htmlFor="username">Email address</label>
                <input
                  id="username"
                  type="text"
                  placeholder="admin@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`rounded-md py-1 bg-gray-700 px-2 outline-none focus:ring-1 focus:ring-red-500 ${
                    error ? "border-red-900 border" : ""
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`rounded-md py-1 bg-gray-700 px-2 outline-none focus:ring-1 focus:ring-red-500 ${
                    error ? "border-red-900 border" : ""
                  }`}
                />
              </div>
            </div>
            <button
              className={`w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition-all ${
                isSubmitting ? "opacity-40" : ""
              }`}
              disabled={isSubmitting}
            >
              Sign In
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
