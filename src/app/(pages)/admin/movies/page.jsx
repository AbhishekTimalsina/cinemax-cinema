"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { getMovies, deleteMovie } from "@/lib/movie-data";
import ModuleHeader from "@/components/admin/module-header";

import BookingTable from "@/components/admin/booking-table";
import DeleteModel from "@/components/admin/delete-model";

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getMovies().then((res) =>
      setAllMovies([...res.commingSoon, ...res.nowShowing])
    );
  }, []);

  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie._id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "now-showing")
      return matchesSearch && new Date(movie.releaseDate) <= new Date();
    if (filterStatus === "coming-soon")
      return matchesSearch && new Date(movie.releaseDate) >= new Date();

    return matchesSearch;
  });

  function openDeleteModel(e, data) {
    setIsDeleteModalOpen(true);
    setMovieToDelete(data);
  }

  async function handleDeleteMovies(movieToDelete) {
    setIsDeleting(true);
    let deletedMovie = await deleteMovie(movieToDelete._id);
    setAllMovies((prev) => prev.filter((d) => d._id != deletedMovie._id));
    setIsDeleteModalOpen(false);
    setIsDeleting(false);
  }

  let columns = [
    {
      header: "Movie",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Title",
      render: (data) => <div>{data.title}</div>,
    },
    {
      header: "Genre",
      render: (data) => <div>{data.genre}</div>,
    },
    {
      header: "Duration",
      render: (data) => <div>{data.duration}</div>,
    },
    {
      header: "Status",
      render: (data) => {
        let todayDate = new Date().toISOString().slice(0, 10);
        let isReleased = !(
          new Date(todayDate) - new Date(data.releaseDate) <
          0
        );

        return <div>{isReleased ? "Now Showing" : "Coming soon"}</div>;
      },
    },
    {
      header: "Actions",
      render: (data) => (
        <div className="flex justify-end space-x-2">
          <Link
            href={`/admin/movies/${data._id}/edit`}
            className="text-blue-500 hover:text-blue-400"
          >
            <Edit className="h-5 w-5" />
          </Link>
          <button
            className="text-red-500 hover:text-red-400"
            onClick={(e) => openDeleteModel(e, data)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Movies Management"
        description="View, add, edit, or delete movies in your catalog"
      >
        <Link
          href="/admin/movies/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Movie
        </Link>
      </ModuleHeader>

      <div className="bg-gray-800 shadow rounded-lg mb-6">
        <div className="p-6 flex md:flex-col flex-row items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-red-500  text-sm"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 sm:text-base border-gray-600 focus:outline-none focus:ring-red-500  bg-gray-700 text-white text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Movies</option>
              <option value="now-showing">Now Showing</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>
        </div>
      </div>

      <BookingTable
        columns={columns}
        tableData={filteredMovies}
        emptyMessage="No movies found"
      />
      {isDeleteModalOpen && (
        <DeleteModel
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteMovies(movieToDelete)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
