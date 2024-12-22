import { useState } from "react";

export default function GenreFilter({ onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleFilter = (e) => {
    setSelectedGenre(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="genre" className="font-medium">
        Filter by Genre:
      </label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={handleFilter}
        className="p-2 border rounded-lg"
      >
        <option value="">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
      </select>
    </div>
  );
}
