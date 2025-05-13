import mongoose from "mongoose";

let SeatSchema = new mongoose.Schema({
  //   showTimeId: { type: mongoose.Schema.ObjectId },
  date: Date,
  time: String,
  totalSeats: Number,
  bookedSeats: [String],
  availableSeats: [String],
});

export default mongoose.models.Seat || mongoose.model("Seat", SeatSchema);
