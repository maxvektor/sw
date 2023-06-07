import { useMovies } from "../hooks/data";
import "./MoviesList.css";

const MoviesList = () => {
  const { data } = useMovies();

  return (
    <div>
      <div className="items-container">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div className="item">
              <div className="item-title">{item.title}</div>
              <div>{item.opening_crawl}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
