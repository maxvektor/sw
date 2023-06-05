import React, { useEffect, useState } from "react";
import "./MoviesList.css";

const MoviesList = () => {
  const [data, setData] = useState<any[]>([]);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson.results);
        setData(myJson.results);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
