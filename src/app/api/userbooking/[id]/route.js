import UserBookings from "@/app/models/UserBookings";
import dbConnect from "@/lib/mongoose";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  await dbConnect();
  const slug = await params;

  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid id" });
  }
  let data = await UserBookings.findById(slug.id)
    // .populate("seatId")
    // .populate("movieId");
    .populate({
      path: "movieId",
      select: "title",
    })
    .populate({ path: "seatId", select: "date time" });
  return Response.json(data);
}
