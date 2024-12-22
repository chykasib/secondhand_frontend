import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Optional: to manage loading state

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery(""); // Clear the search query after submission
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-lg w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        disabled={isSearching} // Disable the button while searching
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
