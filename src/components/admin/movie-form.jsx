"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

export default function MovieForm({ movie, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    releaseDate: "",
    description: "",
    director: "",
    cast: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        genre: movie.genre || "",
        duration: movie.duration || "",
        releaseDate: movie.releaseDate || "",
        description: movie.description || "",
        director: movie.director || "",
        cast: movie.cast || "",
        image: movie.image || "",
      });
      setImagePreview(movie.image || "");
    }
  }, [movie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.releaseDate.trim()) {
      newErrors.releaseDate = "Release date is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow rounded-lg">
      <div className="p-6 border-b border-gray-700">
        <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
          <div className="col-span-2 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Movie Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.title ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-300"
                >
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.genre ? "border-red-500" : "border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                />
                {errors.genre && (
                  <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-300"
                >
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g. 2h 15m"
                  className={`mt-1 block w-full border ${
                    errors.duration ? "border-red-500" : "border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="releaseDate"
                  className="block text-sm font-medium text-gray-300"
                >
                  Release Date
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 10)}
                  className={`mt-1 block w-full border ${
                    errors.releaseDate ? "border-red-500" : "border-gray-600"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className={`mt-1 block w-full border ${
                  errors.description ? "border-red-500" : "border-gray-600"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm`}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="director"
                className="block text-sm font-medium text-gray-300"
              >
                Director
              </label>
              <input
                type="text"
                name="director"
                id="director"
                value={formData.director}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cast"
                className="block text-sm font-medium text-gray-300"
              >
                Cast
              </label>
              <input
                type="text"
                name="cast"
                id="cast"
                value={formData.cast}
                onChange={handleInputChange}
                placeholder="e.g. Actor 1, Actor 2, Actor 3"
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:ring-1 bg-gray-700 text-white sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Movie Poster
            </label>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-[300px] w-[200px] overflow-hidden rounded-lg border border-gray-600">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Movie poster preview"
                  className="object-cover"
                />
              </div>
              <label className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300  bg-gray-700 hover:bg-gray-600">
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : movie ? "Update Movie" : "Create Movie"}
        </button>
      </div>
    </form>
  );
}
