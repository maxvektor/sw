// crutches to deal with vercel's dynamic env vars
export const getServerBaseUrl = () => {
  const PR_ID = process.env.REACT_APP_VERCEL_GIT_PULL_REQUEST_ID;

  if (PR_ID) {
    return `https://maxvektor-starwars-server-pr-${PR_ID}.onrender.com`;
  }

  if (
    process.env.REACT_APP_VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  ) {
    return `https://maxvektor-starwars-server.onrender.com`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  }
};
