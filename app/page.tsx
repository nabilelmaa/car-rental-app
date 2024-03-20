"use client";
import { useState, useEffect } from "react";
import { Hero } from "@components";
import { CarProps } from "@types";
import CarsList from "@components/CarsList";
import CarsFiltersOption from "@components/CarsFiltersOption";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MessageSent from "@components/MessageSent";
import { BookingSentContext } from "@context/BookingSentContext";

export default function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [carsOrg, setCarsOrg] = useState<CarProps[]>([]);
  const [showMesg, setShowMesg] = useState<boolean>(false);
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
        <BookingSentContext.Provider value={{ showMesg, setShowMesg }}>
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
              {showMesg ? (
                <MessageSent msg={"Booking created successfully!"} />
              ) : null}
            </>
          )}
        </BookingSentContext.Provider>
      </div>
    </main>
  );
}

// import { useState, useEffect } from "react";
// import { Hero } from "@components";
// import { CarProps } from "@types";
// import CarsList from "@components/CarsList";
// import CarsFiltersOption from "@components/CarsFiltersOption";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import MessageSent from "@components/MessageSent";
// import { BookingSentContext } from "@context/BookingSentContext";

// export default function Home() {
//   const [cars, setCars] = useState<CarProps[]>([]);
//   const [carsOrg, setCarsOrg] = useState<CarProps[]>([]);
//   const [showMesg, setShowMesg] = useState<boolean>(false);
//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [searchLoading, setSearchLoading] = useState<boolean>(false); // Added loading state for searching

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/cars");
//         const data = await response.json();
//         console.log("Fetched Data:", data);
//         setCars(data);
//         setCarsOrg(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data from API", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filterCarList = async (brand: string) => {
//     // Set searchLoading to true before starting the search
//     setSearchLoading(true);

//     // Simulate a delay (1 second) to show loading
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const filterList = carsOrg.filter(
//       (item: any) => item.manufacturer_name === brand
//     );
//     setCars(filterList);

//     // Set searchLoading to false after search is complete
//     setSearchLoading(false);
//   };

//   const sortCarList = (order: string) => {
//     const sortedList = [...cars].sort((a, b) => {
//       const priceA = a.price;
//       const priceB = b.price;
//       return order === "asc" ? priceA - priceB : priceB - priceA;
//     });
//     setCars(sortedList);
//   };

//   return (
//     <main>
//       <div className="">
//         <BookingSentContext.Provider value={{ showMesg, setShowMesg }}>
//           <Hero />
//           {loading ? (
//             <div className="flex justify-center items-center h-screen">
//               <span className="loading loading-ball loading-xs"></span>
//               <span className="loading loading-ball loading-sm"></span>
//               <span className="loading loading-ball loading-md"></span>
//               <span className="loading loading-ball loading-lg"></span>
//             </div>
//           ) : (
//             <>
//               <div className="p-6 sm:px-10 md:px-20">
//                 <CarsFiltersOption
//                   cars={carsOrg}
//                   setBrand={(value: string) => filterCarList(value)}
//                   setSortOrder={(order: string) => sortCarList(order)}
//                 />
//                 {/* Display loading message during search */}
//                 {searchLoading ? (
//                   <div className="text-center text-gray-500">
//                     <span className="loading loading-ring loading-lg"></span>
//                   </div>
//                 ) : (
//                   // Display CarsList when data is fetched and search is complete
//                   <CarsList cars={cars} />
//                 )}
//               </div>
//               {showMesg ? (
//                 <MessageSent msg={"Booking created successfully!"} />
//               ) : null}
//             </>
//           )}
//         </BookingSentContext.Provider>
//       </div>
//     </main>
//   );
// }
