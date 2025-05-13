import Seats from "@/app/models/Seats";
import UserBookings from "@/app/models/UserBookings";
import dbConnect from "@/lib/mongoose";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  //   const searchParams = request.nextUrl.searchParams;
  await dbConnect();
  const slug = await params;

  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid seat id" });
  }

  let data = await Seats.findById(slug.id);

  return Response.json(data);
}

// export async function POST(request, { params }) {
//   await dbConnect();
//   let body = await request.json();
//   const slug = await params;

//   if (!isValidObjectId(slug.id)) {
//     return Response.json({ error: "Invalid seat id" });
//   }

//   if (!isValidObjectId(body.movieId)) {
//     return Response.json({ error: "Invalid movie id" });
//   }
//   // console.log(body);
//   let data = await Seats.findByIdAndUpdate(slug.id, {
//     $push: { bookedSeats: { $each: [...body.selectedSeats] } },
//   });
//   let userBooking = new UserBookings({
//     ...body.userData,
//     bookedSeats: [...body.selectedSeats],
//     movieId: body.movieId,
//     seatId: slug.id,
//   });

//   await userBooking.save();

//   return Response.json(data);
// }
