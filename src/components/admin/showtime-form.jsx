import { useState } from "react";
import { Clock, CalendarIcon } from "lucide-react";
export function ShowTimeForm({ isSubmitting, movies, onSubmit }) {
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateTimeOptions = () => {
    const options = ["10:15", "12:45", "03:00", "05:45", "07:30"];

    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="space-y-6">
      <form id="showtime-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-medium text-white">Showtime Details</h3>
            <p className="mt-1 text-sm text-gray-400">
              Select a movie and schedule when it will be shown.
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid sm:grid-cols-1 gap-6 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="movieId"
                  className="block text-sm font-medium text-gray-300"
                >
                  Movie
                </label>
                <select
                  id="movieId"
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.movieId ? "border-red-500" : "border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                >
                  <option value="">Select a movie</option>
                  <optgroup label="Now Showing">
                    {movies.nowShowing?.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Coming Soon">
                    {movies.commingSoon?.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.movieId && (
                  <p className="mt-1 text-sm text-red-500">{errors.movieId}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-300"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Date
                  </div>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 10)}
                  max={new Date(Date.now() + 60 * 60 * 24 * 1000 * 5)
                    .toISOString()
                    .slice(0, 10)}
                  className={`mt-1 block w-full border ${
                    errors.releaseDate ? "border-red-500" : "border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                />

                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-300"
                >
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Time
                  </div>
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.time ? "border-red-500" : " border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                >
                  <option value="">Select a time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="mt-1 text-smtext-red-500">{errors.time}</p>
                )}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-700 text-right">
            <button
              type="button"
              onClick={() => router.push("/admin/showtimes")}
              className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500  mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Create Showtime"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
