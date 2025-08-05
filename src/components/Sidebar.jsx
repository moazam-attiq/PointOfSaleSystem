import React from "react";

export default function Sidebar  ({ selected, setSelected , menuItems}) {
return(
  <div className="bg-[#749BC2] p-2 w-48 space-y-2 min-h-screen">
    {menuItems.map((item) => (
      <h4
        key={item.key}
        className={`flex items-center space-x-2 p-2 rounded font-medium cursor-pointer ${
          selected === item.key
            ? "bg-[#91C8E4] text-[#FFFBDE]": "hover:bg-[#91C8E4]"
        }`}
        onClick={() => setSelected(item.key)}
      >
        <span>{item.label}</span>
      </h4>
    ))}
  </div>
)};