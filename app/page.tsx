"use client";
import { useState, useEffect } from "react";
import { Hero } from "@components";
import { CarProps } from "@types";
import CarsList from "@components/CarsList";
import CarsFiltersOption from "@components/CarsFiltersOption";
import CarCardSkeleton from "@components/CarCardSkeleton";
import Skeleton from "@components/Skeleton";

export default function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [carsOrg, setCarsOrg] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cars");
        const data = await response.json();
        console.log("Fetched Data:", data);
        setCars(data);
        setCarsOrg(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, []);

  const filterCarList = async (brand: string) => {
    setSearchLoading(true);

    // Simulate a delay (1 second) to show loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Fetch booked car IDs from the API
      const bookedCarsResponse = await fetch("/api/bookings");
      const bookedCarIds = await bookedCarsResponse.json();

      // Filter out booked cars from the list of all cars
      let availableCars = carsOrg.filter(
        (car) => !bookedCarIds.includes(car.id)
      );

      // Filter the available cars by brand if a specific brand is selected
      if (brand !== "") {
        availableCars = availableCars.filter(
          (item: any) => item.manufacturer_name === brand
        );
      }

      setCars(availableCars);
    } catch (error) {
      console.error("Error fetching booked car IDs from API", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const sortCarList = (order: string) => {
    const sortedList = [...cars].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setCars(sortedList);
  };

  return (
    <main>
      <div>
        <Hero />
        {loading ? (
          <>
            <div className="p-6 sm:px-10 md:px-20">
              <Skeleton />
            </div>
            <div className="flex flex-wrap justify-center">
              <CarCardSkeleton />
              <CarCardSkeleton />
              <CarCardSkeleton />
              <CarCardSkeleton />
            </div>
          </>
        ) : (
          <>
            <div className="p-6 sm:px-10 md:px-20">
              <CarsFiltersOption
                cars={carsOrg}
                setBrand={(value: string) => filterCarList(value)}
                setSortOrder={(order: string) => sortCarList(order)}
              />
              {searchLoading ? (
                <div className="text-center text-gray-500">
                  <span className="loading loading-ring loading-lg"></span>
                </div>
              ) : (
                <CarsList cars={cars} />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
