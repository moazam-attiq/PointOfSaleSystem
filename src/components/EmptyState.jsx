import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col justify-center items-center py-10 text-black">
      <p className="text-lg font-medium">{message || "No data found."}</p>
    </div>
  );
}
