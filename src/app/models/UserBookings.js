import mongoose from "mongoose";

const UserBookingSchema = mongoose.Schema({
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bookedSeats: { type: [String] },
  movieId: { type: mongoose.Schema.ObjectId, ref: "Movies" },
  seatId: { type: mongoose.Schema.ObjectId, ref: "Seat" },
});

export default mongoose.models.UserBooking ||
  mongoose.model("UserBooking", UserBookingSchema);
