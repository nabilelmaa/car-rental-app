"use client";
import { useState, useEffect } from "react";
import { Hero } from "@components";
import { CarProps } from "@types";
import CarsList from "@components/CarsList";
import CarsFiltersOption from "@components/CarsFiltersOption";

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
      const availableCars = carsOrg.filter(
        (car) => !bookedCarIds.includes(car.id)
      );

      // Filter the available cars by brand
      const filterList = availableCars.filter(
        (item: any) => item.manufacturer_name === brand
      );

      setCars(filterList);
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
      <div className="">
        <Hero />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
          </div>
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
