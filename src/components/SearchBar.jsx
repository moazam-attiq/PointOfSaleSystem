import React from "react";
import { useState } from "react";


export default function SearchBar({onSearch}) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value); // notify parent
  };
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search the Products..."
        className="rounded-2xl w-full bg-gray-200 py-4 px-8 text-gray-600 focus:outline-[#91C8E4]"
        value={term}
        onChange={handleChange}
      />
    </div>
  );
}
