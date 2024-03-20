import Image from "next/image";
import { CarProps } from "@types";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaGasPump } from "react-icons/fa";
import { PiSteeringWheelFill } from "react-icons/pi";

interface CarCardProps {
  car: CarProps;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div
      className="group p-2 sm:p-5 rounded-3xl m-1 sm:m-5
        border-[1px] cursor-pointer duration-50"
    >
      <h2 className="text-xl font-medium mb-2">{car.model}</h2>
      <h2 className="text-xl font-bold mb-2">
        <span className="text-[12px] font-light">MAD</span>
        {car.price}
        <span className="text-[12px] font-light">/day</span>
      </h2>
      <div className="relative w-full h-36 mb-3">
        <Image
          src={car.image_url}
          alt={`${car.manufacturer_name} ${car.model}`}
          width={200}
          height={200}
          className="w-[250px] h-[150px] mb-3 object-contain"
        />
      </div>
      <div className="flex justify-around">
        <div className="text-cente">
          <PiSteeringWheelFill className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light">
            {car.transmission_type}
          </h2>
        </div>
        <div className="text-center ">
          <MdAirlineSeatReclineNormal className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light">{car.seats}</h2>
        </div>
        <div className="text-center ">
          <FaGasPump className="w-full text-[22px] mb-2" />
          <h2 className="line-clamp-5 text-[14px] font-light">
            {car.fuel_type}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
