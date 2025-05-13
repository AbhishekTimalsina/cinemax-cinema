import { ChevronRight } from "lucide-react";

export default function BookingProgress({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8 text-sm">
      <div
        className={`flex items-center ${
          currentStep >= 1 ? "text-red-600 font-bold" : "text-gray-500"
        }`}
      >
        <span
          className={`${
            currentStep >= 1 ? "bg-red-600" : "bg-gray-700"
          } text-white rounded-full w-6 h-6 flex items-center justify-center`}
        >
          1
        </span>
        <span className="ml-2">Showtime</span>
      </div>
      <ChevronRight className="mx-2 text-gray-500" size={16} />
      <div
        className={`flex items-center ${
          currentStep >= 2 ? "text-red-600 font-bold" : "text-gray-500"
        }`}
      >
        <span
          className={`${
            currentStep >= 2 ? "bg-red-600" : "bg-gray-700"
          } text-white rounded-full w-6 h-6 flex items-center justify-center`}
        >
          2
        </span>
        <span className="ml-2">Seats</span>
      </div>
      <ChevronRight className="mx-2 text-gray-500" size={16} />
      <div
        className={`flex items-center ${
          currentStep >= 3 ? "text-red-600 font-bold" : "text-gray-500"
        }`}
      >
        <span
          className={`${
            currentStep >= 3 ? "bg-red-600" : "bg-gray-700"
          } text-white rounded-full w-6 h-6 flex items-center justify-center`}
        >
          3
        </span>
        <span className="ml-2">Payment</span>
      </div>
    </div>
  );
}
