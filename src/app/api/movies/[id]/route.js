// import { getMovieById } from "@/lib/movie-data";
import Movies from "@/app/models/Movies";
import Seats from "@/app/models/Seats";
import ShowTimes from "@/app/models/ShowTimes";
import UserBookings from "@/app/models/UserBookings";

import dbConnect from "@/lib/mongoose";
import { del } from "@vercel/blob";
import { put } from "@vercel/blob";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  await dbConnect();
  const slug = await params;

  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid movie id" });
  }
  let data = await Movies.findById(slug.id);

  return Response.json(data);
}

export async function PUT(request, { params }) {
  await dbConnect();

  const slug = await params;
  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid movie id" });
  }
  // const body = await request.json();
  const formData = await request.formData();

  let body = Object.fromEntries(formData.entries());

  if (typeof body.image != "string") {
    const blob = await put(body.image.name + Math.random(), body.image, {
      access: "public",
    });
    body["image"] = blob.url;
  }

  let data = await Movies.findByIdAndUpdate(slug.id, body);
  if (typeof formData.get("image") != "string") {
    await del(data.image);
  }

  return Response.json(data);
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const slug = await params;
  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid movie id" });
  }
  let data = await Movies.findByIdAndDelete(slug.id);
  let showTimeData = await ShowTimes.findOneAndDelete({ movieId: slug.id });
  await UserBookings.deleteMany({ movieId: slug.id });

  await del(data.image);

  if (showTimeData) {
    let allSeats = showTimeData.availableShows.map((d) => d.seatsId);
    await Seats.deleteMany({ _id: { $in: allSeats } });
  }

  return Response.json(data);
}
