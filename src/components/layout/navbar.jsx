"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-red-600 font-bold text-2xl">CINEMAX</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="md:hidden flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-red-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="text-white hover:text-red-500 transition duration-300"
            >
              Movies
            </Link>

            <Link
              href="/admin"
              className="text-white hover:text-red-500 transition duration-300"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="hidden md:block bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>

            <Link
              href="/admin"
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
