import Seats from "@/app/models/Seats";
import ShowTime from "@/app/models/ShowTimes";
import dbConnect from "@/lib/mongoose";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  const slug = await params;
  await dbConnect();

  if (!isValidObjectId(slug.id)) {
    return Response.json({ error: "Invalid showtime id" });
  }
  let showtime = await ShowTime.findOne({ movieId: slug.id });

  let hasShows = true;
  // if the shows has expired date create new shows automatically
  if (showtime != null) {
    hasShows = showtime.availableShows.some(
      (show) => new Date(show.date) >= new Date()
    );
  }

  if (showtime == null || showtime.availableShows.length == 0 || !hasShows) {
    // if there are no shows currently. automatially add them
    let allShowTimes = ["10:15", "12:45", "03:00", "05:45", "07:30"];
    let newSeat1 = new Seats({
      date: new Date(),
      time: allShowTimes[Math.floor(Math.random() * allShowTimes.length)],
      totalSeats: 100,
      bookedSeats: [],
      availableSeats: [],
    });
    await newSeat1.save();

    let newSeat2 = new Seats({
      date: new Date(Date.now() + 86400 * 1000),
      time: allShowTimes[Math.floor(Math.random() * allShowTimes.length)],
      totalSeats: 100,
      bookedSeats: [],
      availableSeats: [],
    });
    await newSeat2.save();

    showtime.availableShows.push({
      date: newSeat1.date,
      time: newSeat1.time,
      seatsId: newSeat1._id,
    });

    showtime.availableShows.push({
      date: newSeat2.date,
      time: newSeat2.time,
      seatsId: newSeat2._id,
    });
    await showtime.save();

    // console.log("there is no shows available");
  }

  return Response.json(showtime);
}

//   let data = await Seats.find({});

//   let newDat = new ShowTime({
//     movieId: "680b361129b09cbcd41e15f6",
//     availableShows: [
//       {
//         date: new Date("2025-04-25"),
//         time: "10 AM",
//         seatsId: "680b79b3897a9c93e8e8ec78",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "1:15 AM",
//         seatsId: "680b7d992aeb87e96fcb3e8e",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "4 AM",
//         seatsId: "680b7d992aeb87e96fcb3e90",
//       },
//       {
//         date: new Date("2025-04-25"),
//         time: "7:30 AM",
//         seatsId: "680b7d992aeb87e96fcb3e92",
//       },
//     ],
//   });

//   await newDat.save();

//   await new Seats({
//     time: "1:15 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();
//   await new Seats({
//     time: "4 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();
//   await new Seats({
//     time: "7:30 AM",
//     date: new Date("2025-04-25"),
//     totalSeats: 100,
//     bookedSeats: [],
//     availableSeats: [],
//   }).save();

//   await st.save();
//   console.log(data[0].date.toDateString());
