import React, { useState } from 'react';
import { CarProps } from "@types";
import CarCard from "./CarCard";
import MyModal from "./Modal";

interface CarsListProps {
  cars: CarProps[];
}

const CarsList: React.FC<CarsListProps> = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState<CarProps | null>(null);

  const openModal = (car: CarProps) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.isArray(cars) && cars.map((car) => (
        <div key={car.id} onClick={() => openModal(car)}>
          <CarCard car={car} />
        </div>
      ))}

      {selectedCar && (
        <MyModal car={selectedCar} closeModal={closeModal} />
      )}
    </div>
  );
};

export default CarsList;
