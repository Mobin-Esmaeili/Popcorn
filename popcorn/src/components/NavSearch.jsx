import { useEffect, useRef } from "react";
import useKey from "../useKey";

const NavSearch = ({ query, setQuery }) => {
  const input = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === input.current) return;
    input.current.focus();
    setQuery("");
  });

  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={input}
    />
  );
};

export default NavSearch;
