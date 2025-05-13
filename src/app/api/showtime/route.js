import Seats from "@/app/models/Seats";
import ShowTimes from "@/app/models/ShowTimes";

import dbConnect from "@/lib/mongoose";

export async function GET() {
  await dbConnect();
  let data = await ShowTimes.find({})
    .populate({
      path: "availableShows",
      populate: {
        path: "seatsId",
        model: "Seat",
      },
    })
    .populate({ path: "movieId", select: "title _id" });

  // console.log([...data]);

  // console.log(data[0].availableShows);

  return Response.json(data);
}

export async function POST(request) {
  await dbConnect();

  let body = await request.json();

  let newSeat = new Seats({
    date: new Date(body.date),
    time: body.time,
    totalSeats: 100,
    bookedSeats: [],
    availableSeats: [],
  });
  await newSeat.save();

  let showTime = await ShowTimes.findOne({ movieId: body.movieId });

  if (!showTime || showTime?.length == 0) {
    let newShowTime = new ShowTimes({
      movieId: body.movieId,
      availableShows: [
        { date: body.date, time: body.time, seatsId: newSeat._id },
      ],
    });

    await newShowTime.save();
  } else {
    showTime.availableShows.push({
      date: body.date,
      time: body.time,
      seatsId: newSeat._id,
    });
    await showTime.save();
  }

  return Response.json(showTime);
}
