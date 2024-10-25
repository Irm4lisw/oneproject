import React from "react";

const Search = () => {
  return (
    <div>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-80">
        <input
          type="text"
          placeholder="Cari..."
          className="flex-grow p-2 outline-none"
        />
        <button className="bg-blue-500 text-white p-2 hover:bg-blue-600">
          <span role="img" aria-label="search">
            🔍
          </span>
        </button>
      </div>
    </div>
  );
};

export default Search;
