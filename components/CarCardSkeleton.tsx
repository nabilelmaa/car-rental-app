import React from "react";

const CarCardSkeleton = () => {
  return (
    <div className="grid animate-pulse">
      <div className="group p-2 sm:p-5 rounded-3xl border m-1 sm:m-5 duration-50">
        <div className="bg-gray-200 h-5 rounded mb-2"></div>
        <div className="bg-gray-200 h-5 rounded mb-2"></div>
        <div className="relative w-full h-36 mb-3">
          <div className="bg-gray-200 w-[200px] h-[150px] mb-3 rounded"></div>
        </div>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
          </div>
          <div className="text-center">
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
            <div className="bg-gray-200 w-full h-5 mb-2 rounded"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-200 text-gray-200 px-4 py-2 rounded-full mt-4 mx-auto items-center transition-transform transform">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
