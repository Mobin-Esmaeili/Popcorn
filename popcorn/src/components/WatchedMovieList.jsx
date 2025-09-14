import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({watched , onDelete}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} onDelete={onDelete} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
