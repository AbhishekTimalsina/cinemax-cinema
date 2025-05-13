export async function getMovies() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies`);
  data = await data.json();
  return data;
}

export async function getMovieById(id) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`,
    {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
    }
  );
  data = await data.json();

  return data;
}

export async function getShowTimesByMovie(movieId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${movieId}/showtimes`
  );
  data = await data.json();
  return data;
}

export async function getShowtimeById(showId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime/${showId}`
  );
  data = await data.json();
  return data;
}

export async function getAllBookings() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking`);
  data = await data.json();
  return data;
}

export async function getSeatById(id) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/seat/${id}`);
  data = await data.json();
  return data;
}

export async function postNewMovie(movieData) {
  let formData = new FormData();

  for (let key of Object.keys(movieData)) {
    formData.append(key, movieData[key]);
  }

  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/movies`, {
    method: "POST",
    body: formData,
  });
  data = await data.json();

  return data;
}

export async function putUpdateMovie(id, movieData) {
  let formData = new FormData();

  for (let key of Object.keys(movieData)) {
    formData.append(key, movieData[key]);
  }

  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`,
    {
      method: "PUT",
      body: formData,
    }
  );
  data = await data.json();
  return data;
}

export async function deleteMovie(id) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/movies/${id}`,
    {
      method: "DELETE",
    }
  );
  data = await data.json();

  return data;
}

export async function postBookTicket(seatId, movieId, selectedSeats, userData) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking?seatId=${seatId}`,
    {
      // let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/seat/${seatId}`, {
      method: "POST",
      body: JSON.stringify({
        selectedSeats: selectedSeats,
        userData: userData,
        movieId: movieId,
      }),
    }
  );
  data = await data.json();
  return data;
}

export async function getBookingById(id) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/userbooking/${id}`
  );
  data = await data.json();

  return data;
}

export async function getAllShowTime() {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime`);
  data = await data.json();
  return data;
}

export async function deleteShowTime(showTimeId, seatId) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime/${showTimeId}?seatId=${seatId}`,
    {
      method: "DELETE",
    }
  );
  data = await data.json();
  return data;
}

export async function postNewShowTime(showTimeData) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URI}/api/showtime`, {
    method: "POST",
    body: JSON.stringify(showTimeData),
  });

  data = data.json();
  return data;
}

// export function getShowtimeById(id) {
//   return showtimes.find((showtime) => showtime.id === id);
// }

export function getShowtimesByDate(date) {
  return showtimes.filter((showtime) => showtime.date === date);
}
