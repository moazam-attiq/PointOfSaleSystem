import React from "react";

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-full py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 border-solid mb-4" />
      <p className="text-gray-600 font-medium text-lg">{message}</p>
    </div>
  );
}
