import React from "react";
import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  return (
    <div>
      <header className="App-header">STAR WARS MOVIES</header>
      <MoviesList></MoviesList>
    </div>
  );
}

export default App;
