import React from "react";

function Skeleton() {
  return (
    <div className="mt-10 flex item-center justify-between">
      <div className="home__text-container animate-pulse">
        <div className="bg-gray-200 h-10 w-72 rounded mb-2"></div>
        <div className="bg-gray-200 h-6 w-48 rounded"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <div className="select-primary w-full md:w-[45%] max-w-xs font-bold sm:text-sm ">
          <div className="bg-gray-200 h-10 w-24 rounded-md"></div>
        </div>
        <div className="select-primary w-full md:w-[45%] max-w-xs font-bold sm:text-sm">
          <div className="bg-gray-200 h-10 w-24 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
