"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Calendar, Edit, Trash2 } from "lucide-react";
import { deleteShowTime, getAllShowTime } from "@/lib/movie-data";
import ModuleHeader from "@/components/admin/module-header";
import BookingTable from "@/components/admin/booking-table";
import DeleteModel from "@/components/admin/delete-model";

export default function ShowtimesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [showTimeData, setShowTimeData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToDelete, setShowToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getAllShowTime().then((res) => {
      let filter = res.reduce((acc, data) => {
        let cur = [...acc];
        data.availableShows.map((d) => {
          cur.push({
            ...d,
            movieName: data.movieId.title,
            showTimeId: data._id,
          });
        });
        return cur;
      }, []);
      setShowTimeData(filter);
    });
  }, []);

  const filteredShowtimes = showTimeData.filter((showtime) => {
    const matchesSearch =
      showtime.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      showtime._id.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterDate == "all") return matchesSearch;
    if (filterDate == "today")
      return (
        matchesSearch &&
        new Date(showtime.date).toDateString() == new Date().toDateString()
      );
    if (filterDate == "upcoming")
      return (
        matchesSearch &&
        new Date(new Date(showtime.date).toDateString()) >
          new Date(new Date().toDateString())
      );

    return matchesSearch;
  });

  async function handleDeleteShow(data) {
    setIsDeleting(true);
    682;
    await deleteShowTime(data.showTimeId, data.seatsId._id);
    setShowTimeData((prevData) => prevData.filter((d) => d._id != data._id));
    setIsDeleteModalOpen(false);
    setIsDeleting(false);
  }

  function openDeleteModel(e, data) {
    setIsDeleteModalOpen(true);
    setShowToDelete(data);
  }

  let columns = [
    {
      header: "ShowTime Id",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Date",
      render: (data) => <div>{new Date(data.date).toDateString()}</div>,
    },
    {
      header: "Time",
      render: (data) => <div>{data.time}</div>,
    },
    {
      header: "Movie",
      render: (data) => <div>{data.movieName}</div>,
    },
    {
      header: "Booked Seats",
      render: (data) => (
        <div className="text-center">{data.seatsId.bookedSeats.length}/100</div>
      ),
    },
    {
      header: "Actions",
      render: (data) => (
        <div className="flex justify-start">
          <button
            className="text-red-500 hover:text-red-400"
            onClick={(e) => openDeleteModel(e, data)}
            // onClick={(e) => handleDeleteShow(e, data)}
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
        title="Showtimes Management"
        description="Schedule and manage movie showtimes"
      >
        <Link
          href="/admin/showtimes/create"
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Showtime
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="Search showtimes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 sm:text-base border-gray-600 focus:outline-none focus:ring-red-500 focus:ring-2 bg-gray-700 text-white text-sm rounded-md"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>

      <BookingTable
        columns={columns}
        tableData={filteredShowtimes}
        emptyMessage="No ShowTimes"
      />
      {isDeleteModalOpen && (
        <DeleteModel
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteShow(showToDelete)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
