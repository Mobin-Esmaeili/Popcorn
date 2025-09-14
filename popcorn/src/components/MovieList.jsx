import Movie from "./Movie";

const MovieList = ({movies , onSelection}) => {
  
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} onSelection={onSelection} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
