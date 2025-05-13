"use client";

export default function TicketTypeSelector({ selectedType, onSelectType }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Select Ticket Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-lg cursor-pointer border-2 ${
            selectedType === "standard"
              ? "border-red-600 bg-gray-800"
              : "border-gray-700 bg-gray-900"
          }`}
          onClick={() => onSelectType("standard")}
        >
          <h3 className="font-bold">Standard</h3>
          <p className="text-gray-400 text-sm">Regular seating</p>
          <p className="font-bold mt-2">$12.99</p>
        </div>
        <div
          className={`p-4 rounded-lg cursor-pointer border-2 ${
            selectedType === "premium"
              ? "border-red-600 bg-gray-800"
              : "border-gray-700 bg-gray-900"
          }`}
          onClick={() => onSelectType("premium")}
        >
          <h3 className="font-bold">Premium</h3>
          <p className="text-gray-400 text-sm">Enhanced comfort</p>
          <p className="font-bold mt-2">$15.99</p>
        </div>
        <div
          className={`p-4 rounded-lg cursor-pointer border-2 ${
            selectedType === "vip"
              ? "border-red-600 bg-gray-800"
              : "border-gray-700 bg-gray-900"
          }`}
          onClick={() => onSelectType("vip")}
        >
          <h3 className="font-bold">VIP</h3>
          <p className="text-gray-400 text-sm">Luxury recliner seats</p>
          <p className="font-bold mt-2">$19.99</p>
        </div>
      </div>
    </div>
  );
}
