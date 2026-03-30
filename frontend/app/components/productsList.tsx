"use client";

import React from "react";

export default function ProductList() {
  const items = [...Array(12).keys()].map(i => i + 1); // [1, 2, ..., 12]

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-aldrich text-gray-800">Product Selector</h2>
      </div>

      <div className="aspect-square w-full overflow-auto rounded-lg">
        <div className="grid grid-cols-4 grid-rows-3 gap-2">
          {items.map((item) => (
            <div
              key={item}
              className="bg-black rounded-md h-15 w-15 flex items-center justify-center text-white text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
            >
              <span className="opacity-70">Slot {item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}