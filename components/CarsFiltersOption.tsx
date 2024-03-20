import React, { useEffect, useState } from "react";

function CarsFiltersOption({ cars, setBrand, setSortOrder }: any) {
  const [brandList, setBrandList] = useState<string[]>();
  const brandSet = new Set<string>();

  useEffect(() => {
    if (cars && cars.length > 0) {
      filterCarList();
    }
  }, [cars]);

  const filterCarList = () => {
    cars.forEach((elem: any) => {
      brandSet.add(elem.manufacturer_name);
    });
    setBrandList(Array.from(brandSet));
  };

  return (
    <div className="mt-10 flex item-center justify-between">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore our cars you might like</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-5">
        <select
          className="select select-primary w-full md:w-[45%] max-w-xs font-bold sm:text-sm"
          defaultValue=""
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Price</option>
          <option value="asc">Min to Max</option>
          <option value="desc">Max to Min</option>
        </select>
        <select
          className="select select-primary w-full md:w-[45%] max-w-xs font-bold sm:text-sm"
          defaultValue=""
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Manufacturer</option>
          <option value="">All</option> {/* New option for All */}
          {brandList &&
            brandList.map((brand: string, index: number) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default CarsFiltersOption;
