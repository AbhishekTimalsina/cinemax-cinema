import Movies from "@/app/models/Movies";
import Seats from "@/app/models/Seats";
import UserBookings from "@/app/models/UserBookings";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  await dbConnect();
  let data = await UserBookings.find({})
    // .populate("movieId")
    .populate({ path: "movieId", select: "title" })
    .populate({ path: "seatId", select: "date time" });

  return Response.json(data);
}

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  await dbConnect();
  let body = await request.json();

  let seatId = searchParams.get("seatId");

  let seat = await Seats.findById(seatId);

  let isAlreadySelectedSeatPresent = false;

  body.selectedSeats.forEach((s) => {
    if (seat.bookedSeats.includes(s)) isAlreadySelectedSeatPresent = true;
  });

  if (isAlreadySelectedSeatPresent) {
    return Response.json({ success: false, message: "Seat is already booked" });
  } else {
    seat.bookedSeats.push(...body.selectedSeats);
    await seat.save();
  }

  let userBooking = new UserBookings({
    ...body.userData,
    bookedSeats: [...body.selectedSeats],
    movieId: body.movieId,
    seatId: seatId,
  });

  await userBooking.save();

  return Response.json(userBooking);
}

// await dbConnect();
// let body = await request.json();
// const slug = await params;
// // console.log(body);
// let data = await Seats.findByIdAndUpdate(slug.id, {
//   $push: { bookedSeats: { $each: [...body.selectedSeats] } },
// });
// console.log(body);
// let userBooking = new UserBookings({
//   ...body.userData,
//   bookedSeats: [...body.selectedSeats],
//   movieId: body.movieId,
//   seatId: slug.id,
// });

// await userBooking.save();

// // console.log(userBooking);

// return Response.json(data);
