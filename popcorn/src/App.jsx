import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import MainPart from "./components/MainPart";
import Logo from "./components/Logo";
import NavSearch from "./components/NavSearch";
import NumResult from "./components/NumResult";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import useMovie from "./useMovie";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const {movies , error , isLoading ,setIsLoading} = useMovie(query);
  const [watched, setWatched] = useLocalStorage([] , "watched")

  const handleSelection = (id) => {
    setSelectedMovie((selectedMovie) => (selectedMovie === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Logo />
        <NavSearch query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <MainPart>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList onSelection={handleSelection} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selectedMovie ? (
              <MovieDetails
                onClose={handleCloseMovie}
                selectedMovie={selectedMovie}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                watched={watched}
                onAddMovie={handleAddWatched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList
                  onDelete={handleDeleteMovie}
                  watched={watched}
                />
              </>
            )}
          </>
        </Box>
      </MainPart>
    </>
  );
};
export default App;
