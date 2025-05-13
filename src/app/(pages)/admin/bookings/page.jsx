"use client";

import { useEffect, useState } from "react";
import { Search, Calendar } from "lucide-react";
import { getAllBookings } from "@/lib/movie-data";
import BookingTable from "@/components/admin/booking-table";

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllBookings().then((res) => {
      let data = res.map((data) => {
        return {
          ...data,
          movieName: data.movieId.title,
          date: data.seatId.time,
          time: data.seatId.date,
        };
      });

      setLoading(false);
      setBooking(data);
    });
  }, []);
  const filteredBookings = booking.filter((booking) => {
    const matchesSearch =
      booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.cardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movieName.toLowerCase().includes(searchTerm.toLowerCase());

    if (dateRange === "all") return matchesSearch;
    if (dateRange === "today")
      return (
        matchesSearch &&
        new Date(booking.time).toDateString() == new Date().toDateString()
      );
    if (dateRange === "upcoming")
      return (
        matchesSearch &&
        new Date(new Date(booking.time).toDateString()) >
          new Date(new Date().toDateString())
      );

    return matchesSearch;
  });

  let columns = [
    {
      header: "Booking Id",
      render: (data) => <div>{data._id}</div>,
    },
    {
      header: "Customer",
      render: (data) => <div>{data.cardName}</div>,
    },
    {
      header: "Movie",
      render: (data) => <div>{data.movieName}</div>,
    },
    {
      header: "Date & Time",
      render: (data) => (
        <div>
          {data.date}, {new Date(data.time).toDateString()}
        </div>
      ),
    },
    {
      header: "Seats",
      render: (data) => <div>{data.bookedSeats.join(",")}</div>,
    },
    {
      header: "Amount",
      render: (data) => <div>${data.bookedSeats.length * 10}</div>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 shadow rounded-lg mb-6">
        <div className="p-6 flex md:flex-col flex-row items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 ">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 sm:text-base border-gray-600 focus:outline-none focus:ring-red-500 focus:ring-2 bg-gray-700 text-white text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <BookingTable
        tableData={filteredBookings}
        columns={columns}
        emptyMessage="No Booking found"
        loading={loading}
      />
    </div>
  );
}
