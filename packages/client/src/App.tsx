import styles from "./App.module.css";
import MoviesList from "./components/MovieList/MoviesList";

function App() {
  return (
    <div>
      <header className={styles.header}>STAR WARS MOVIES</header>
      <MoviesList />
    </div>
  );
}

export default App;
