import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  releaseDate: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: String, required: true },
});

export default mongoose.models.Movies || mongoose.model("Movies", MovieSchema);
