import dbConnect from "@/lib/mongoose";
import Movies from "@/app/models/Movies";
import { put } from "@vercel/blob";
import ShowTimes from "@/app/models/ShowTimes";

export async function GET() {
  await dbConnect();

  let data = await Movies.find({});

  // filter data by now showing and comming soon
  // let filteredData = data.reduce(
  //   (acc, curr) => {
  //     if (curr.releaseDate == "Now Showing") {
  //       return { ...acc, nowShowing: [...acc.nowShowing, curr] };
  //     }
  //     return { ...acc, commingSoon: [...acc.commingSoon, curr] };
  //   },
  //   {
  //     commingSoon: [],
  //     nowShowing: [],
  //   }
  // );
  // filter data by now showing and comming soon

  let filteredData = data.reduce(
    (acc, curr) => {
      let todayDate = new Date().toISOString().slice(0, 10);
      let isReleased = !(new Date(todayDate) - new Date(curr.releaseDate) < 0);

      return isReleased
        ? { ...acc, nowShowing: [...acc.nowShowing, curr] }
        : { ...acc, commingSoon: [...acc.commingSoon, curr] };
    },
    {
      commingSoon: [],
      nowShowing: [],
    }
  );

  return Response.json(filteredData);
}

export async function POST(request) {
  await dbConnect();

  let formData = await request.formData();

  let body = Object.fromEntries(formData.entries());

  const blob = await put(body.image.name + Math.random(), body.image, {
    access: "public",
  });

  let newMovie = new Movies({
    ...body,
    image: blob.url,
  });

  await newMovie.save();
  let showTime = new ShowTimes({
    movieId: newMovie._id,
    availableShows: [],
  });

  await showTime.save();

  return Response.json(body);
}
