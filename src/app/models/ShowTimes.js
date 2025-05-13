import mongoose from "mongoose";

let ShowTimesSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.ObjectId, required: true, ref: "Movies" },
  availableShows: {
    type: [
      {
        date: Date,
        time: String,
        seatsId: { type: mongoose.Schema.ObjectId, ref: "Seat" },
      },
    ],
  },
});

export default mongoose.models.ShowTime ||
  mongoose.model("ShowTime", ShowTimesSchema);
