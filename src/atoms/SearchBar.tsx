import React from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar mb-3 d-flex justify-content-end align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="🔍 Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ maxWidth: "300px" }}
      />
      <button
        className="btn btn-outline-primary"
        onClick={() => setSearchTerm("")}
        title="Clear search"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;