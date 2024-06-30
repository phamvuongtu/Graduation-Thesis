import React from "react";

const Input = ({ customInput, setCustomInput }) => {
  const classNames = [
    "focus:outline-none",
    "w-full",
    "border-2",
    "border-neutrals-neutrals100",
    "rounded-xl",
    "px-4",
    "py-2",
    "hover:shadow-lg",
    "transition",
    "duration-200",
    "bg-white",
    "mt-2",
    "text-base-black",
  ].join(" ");

  return (
    <textarea
      rows="5"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder="type input here"
      className={classNames}
    ></textarea>
  );
};

export default Input;
