"use client";
import React, { useEffect, useState } from "react";
import { CarProps } from "@types";
import MessageFailed from "@components/MessageFailed";
import MessageSuccess from "@components/MessageSuccess";

interface FormProps {
  onSubmit: () => void;
  onClose: () => void;
  car: any;
  address: string;
}

const Form: React.FC<FormProps> = ({ car }) => {
  const [locations, setLocations] = useState<CarProps[]>([]);
  const [bookingError, setBookingError] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formValue, setFormValue] = useState({
    carId: car.car_id,
    location: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/locations");
        const data = await response.json();
        console.log("Fetched Data: ", data);
        setLocations(data);
      } catch (err) {
        console.error({ err });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (car) {
      console.log("Setting form values");
      setFormValue({
        carId: car.car_id,
        location: "",
        pickUpDate: "",
        dropOffDate: "",
        pickUpTime: "",
        dropOffTime: "",
        phone: "",
      });
    }
  }, [car]);

  useEffect(() => {
    if (car) {
      setFormValue({
        ...formValue,
        carId: car.car_id,
      });
    }
  }, [car]);
  const handleChange = (event: any) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form with data:", formValue);

      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (response.ok) {
        setBookingSuccess(true);
        const { rentalId } = await response.json();
        console.log("Rental created successfully. Rental ID:", rentalId);
        setTimeout(() => {
          setBookingSuccess(false);
        }, 5000);
      } else {
        console.error(
          "Failed to create rental. Server returned:",
          response.status,
          response.statusText
        );
        setBookingError(true);
        setTimeout(() => {
          setBookingError(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setBookingError(true);
      setTimeout(() => {
        setBookingError(false);
      }, 5000);
    }
  };

  return (
    <div>
      {bookingError && (
        <MessageFailed
          msg={"Booking failed. Please select another time slot."}
        />
      )}

      {bookingSuccess && (
        <MessageSuccess msg={"Booking created successfully!"} />
      )}
      <div className="flex flex-col w-full mb-5">
        <label className="text-white font-bold">Pick Up Location</label>
        <select
          className="select select-bordered w-full max-w-lg font-bold"
          name="location"
          onChange={handleChange}
          required
        >
          <option>Choose Location?</option>
          {locations &&
            locations.map((loc: any, index: number) => (
              <option key={index}>{loc.address}</option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col w-full">
          <label className="text-gray-400 font-bold">Pick Up Date</label>
          <input
            type="date"
            placeholder="Select date"
            name="pickUpDate"
            onChange={handleChange}
            className="input input-bordered w-full max-w-lg font-bold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 font-bold">Drop Off Date</label>
          <input
            type="date"
            placeholder="Select date"
            name="dropOffDate"
            onChange={handleChange}
            className="input input-bordered w-full max-w-lg font-bold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 font-bold">Pick Up Time</label>
          <input
            type="time"
            placeholder="Select time"
            name="pickUpTime"
            onChange={handleChange}
            className="input input-bordered w-full max-w-lg font-bold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 font-bold">Drop Off Time</label>
          <input
            type="time"
            placeholder="Select time"
            name="dropOffTime"
            onChange={handleChange}
            className="input input-bordered w-full max-w-lg font-bold"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-gray-400 font-bold">Phone</label>
        <input
          type="tel"
          placeholder="e.g: 0611223344"
          name="phone"
          onChange={handleChange}
          className="input input-bordered w-full max-w-lg font-bold"
          required
        />
      </div>
      <div className="modal-action">
        <button
          className="btn bg-blue-500 text-white hover:bg-blue-900"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
