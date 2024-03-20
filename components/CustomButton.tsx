import React from "react";
import Image from "next/image";
import { CustomButtonProps } from "@types";

const CustomButton = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  handleClick,
  darkMode,
}: CustomButtonProps) => {
  const buttonClasses = `custom-btn ${containerStyles} ${
    darkMode ? "dark" : ""
  }`;

  return (
    <button
      disabled={isDisabled}
      type={btnType || "button"}
      className={`${buttonClasses} ${
        darkMode
          ? "dark:bg-white dark:text-[#312e81]"
          : "bg-[#312e81] text-white"
      }`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="arrow_left"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
