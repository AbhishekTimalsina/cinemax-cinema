// import Seats from "@/app/models/Seats";
// import dbConnect from "@/lib/mongoose";

// // useless

// export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   await dbConnect();

//   // console.log(searchParams.get("id"));
//   let data = await Seats.find({});
//   // let data = await Seats.findById(searchParams.get("id"));
//   return Response.json(data);
//   // console.log(data);
//   // return Response.json(data);
// }

// export async function POST(request) {
//   const searchParams = request.nextUrl.searchParams;
//   await dbConnect();
//   let body = await request.json();

//   console.log(searchParams.get("id"));

//   // console.log(body);
//   Seats.findByIdAndUpdate(searchParams.get("id"), {
//     $push: { bookedSeats: { $each: [...body.selectedSeats] } },
//   }).then((res) => console.log(res));

//   let data = await Seats.findById(searchParams.get("id"));

//   return Response.json(data);
// }
