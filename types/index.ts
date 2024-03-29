import { MouseEventHandler } from "react";

export interface CarProps {
  id: number;
  manufacturer_id: number;
  model: string;
  fuel_type: string;
  transmission_type: string;
  production_year: number;
  image_url: string;
  seats: number;
  price: number;
  manufacturer_name: string;
  locations: string
}

export type CarState = CarProps[] & { message?: string };

export interface SearchBarProps {
  setManuFacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  darkMode: boolean;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps<T> {
  options: OptionProps[];
  setFilter: (selected: T) => void;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}

export interface SearchManuFacturerProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export interface InfoProps {
  email: string;
  name: string;
  setError: (error: string) => void; // Assuming setError is a function that sets an error string
  showPassword: boolean;
  setShowPassword: (show: boolean) => void; // Assuming setShowPassword is a function that sets a boolean
}
