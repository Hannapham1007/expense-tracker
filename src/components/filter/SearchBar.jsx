import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ filterText, setFilterText }) {
  return (
    <div style={{ position: "relative"}} >
      <input
        id="search"
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search for a category or keyword"
        style={{
          width: "100%",
          padding: "8px 10px 8px 40px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <FaSearch
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          fontSize: "18px",
        }}
      />
    </div>
  );
}

export default SearchBar;
