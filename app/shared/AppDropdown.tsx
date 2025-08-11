"use client"
import { ReactNode, useState } from "react";

interface AppDropdownProps{
    value:string,
    onSelect:(value:string)=>void,
    options:{
        label:ReactNode,
        value:string
        [key:string]:any
    }[]
}

const AppDropdown = ({value,onSelect,options}:AppDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="px-4 ml-auto w-full py-2 border border-[#E0E0E0] rounded-md cursor-pointer text-left"
      >
        {options.find((opt) => opt.value === value)?.label ?? "Select Options"}
      </button>

      {dropdownOpen && (
        <ul className="absolute z-10 mt-2 w-36 rounded-md bg-white border border-gray-300 shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option.value);
                setDropdownOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppDropdown;