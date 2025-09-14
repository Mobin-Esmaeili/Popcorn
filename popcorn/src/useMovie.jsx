import { useEffect , useState } from "react";

const useMovie = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {

      const controller = new AbortController();
      async function getMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=a00553b1&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setTimeout(() => {
            setIsLoading(false);
          }, 1200);
        } catch (error) {
          if (error.name !== "AbortError") setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      getMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return{movies , error , isLoading ,setIsLoading}
};

export default useMovie;
