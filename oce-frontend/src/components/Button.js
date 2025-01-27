import React from "react";

function Button({
  label,
  icon,
  altText,
  bgColor = "bg-base-white",
  textColor = "text-primary-primary500",
  borderColor = "border-primary-primary500",
  hoverBgColor = "hover:bg-primary-primary300",
  hoverTextColor = "hover:text-primary-primary500",
  hoverBorderColor = "hover:border-primary-primary500",
  onClick,
  className = "",
}) {
  return (
    <button
    className={`inline-flex gap-1 items-center justify-center whitespace-nowrap px-3 py-2 ${className} ${bgColor} ${textColor} ${borderColor} border rounded-xl ${hoverBgColor} ${hoverTextColor} ${hoverBorderColor} hover:shadow-lg`}
    aria-label={altText}
    onClick={onClick}
  >
    <div className="shrink-0 my-auto w-4 aspect-square justify-center align-middle">
      {icon}
    </div>
    <span className="justify-center font-bold align-middle">{label}</span>
  </button>
  );
}

export default Button;
