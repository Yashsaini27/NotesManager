// src/components/Textbox.tsx

import React, { forwardRef } from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextboxProps {
  type: string;
  placeholder?: string;
  label?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  name: string;
  error?: string;
}

const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800">
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

Textbox.displayName = "Textbox"; // Adding a display name for better debugging

export default Textbox;
