import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col justify-center items-center py-10 text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-medium">{message || "No data found."}</p>
    </div>
  );
}
