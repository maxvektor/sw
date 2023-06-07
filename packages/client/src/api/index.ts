export const getMovies = async () =>
  fetch("http://localhost:3001/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.results);
