import { useEffect, useState } from 'react'

const useLocalStorage = (initialState , key) => {
    const [storedValue, setStoredValue] = useState(() => {
        const storedMovies = localStorage.getItem(key);
        return storedMovies ? JSON.parse(storedMovies) : initialState;
      });

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
      }, [storedValue , key]);

      return [storedValue , setStoredValue]
}

export default useLocalStorage