import Seats from "@/app/models/Seats";
import ShowTimes from "@/app/models/ShowTimes";
import UserBookings from "@/app/models/UserBookings";

import dbConnect from "@/lib/mongoose";
import { isValidObjectId } from "mongoose";

// export async function PUT(request, { params }) {
//   await dbConnect();
//   let body = await request.json();
//   let slug = await params;

//   if (!isValidObjectId(slug.id)) {
//     return Response.json({ error: "Invalid showtime id" });
//   }
//   return Response.json({ win: true });
// }

// export async function GET(request, { params }) {
//   await dbConnect();
//   let slug = await params;

//   if (!isValidObjectId(slug.id)) {
//     return Response.json({ error: "Invalid showtime id" });
//   }

//   let showTime = await ShowTimes.findById(slug.id);

//   return Response.json({ win: true });
// }

export async function DELETE(request, { params }) {
  await dbConnect();

  let searchParams = request.nextUrl.searchParams;
  let seatId = searchParams.get("seatId");
  let slug = await params;

  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid showtime id" });
  }

  let data = await ShowTimes.updateOne(
    { _id: slug.id },
    { $pull: { availableShows: { seatsId: seatId } } }
  );

  await Seats.deleteOne({ _id: seatId });
  await UserBookings.deleteMany({ seatId });

  return Response.json(data);
}
