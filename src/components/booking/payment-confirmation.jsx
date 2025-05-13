"use client";

import { CheckCircle } from "lucide-react";

export default function PaymentConfirmation({ formData, onBack, onConfirm }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="text-center mb-6">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold">Confirm Your Payment</h2>
        <p className="text-gray-400">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2 text-lg">Payment Details</h3>
        <div className="bg-gray-800 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Card Number:</span>
            <span>**** **** **** {formData.cardNumber.slice(-4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Name on Card:</span>
            <span>{formData.cardName}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2 text-lg">Contact Information</h3>
        <div className="bg-gray-800 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Email:</span>
            <span>{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Phone:</span>
            <span>{formData.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded transition duration-300"
        >
          Back to Payment
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-300"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
