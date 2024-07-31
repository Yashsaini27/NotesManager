import clsx from "clsx";
import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  className?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ icon, className, label, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
