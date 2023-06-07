export const getServetBaseUrl = () => {
  const PR_ID = process.env.VERCEL_GIT_PULL_REQUEST_ID;
  
  if(PR_ID){
    return `https://maxvektor-starwars-server-pr-${PR_ID}.onrender.com`
  }

  if(process.env.NODE_ENV === 'production'){
    return `https://maxvektor-starwars-server.onrender.com`
  }

  if(process.env.NODE_ENV === 'development'){
    return "http://localhost:3001";
  }
};