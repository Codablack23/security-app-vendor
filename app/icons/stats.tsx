import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fillColor?: string;
}

const StatsIcon: React.FC<IconProps> = ({
  width = 26,
  height = 27,
  className,
  fillColor = "#555555",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 27"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.6875 19.8158L6.6875 14.7632"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 19.8159L13 7.18433"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.3125 19.8153L19.3125 12.2363"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1 13.5C1 7.84315 1 5.01472 2.75736 3.25736C4.51472 1.5 7.34315 1.5 13 1.5C18.6569 1.5 21.4853 1.5 23.2426 3.25736C25 5.01472 25 7.84315 25 13.5C25 19.1569 25 21.9853 23.2426 23.7426C21.4853 25.5 18.6569 25.5 13 25.5C7.34315 25.5 4.51472 25.5 2.75736 23.7426C1 21.9853 1 19.1569 1 13.5Z"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StatsIcon;
