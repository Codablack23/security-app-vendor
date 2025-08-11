import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fillColor?: string;
}

const CloseIcon: React.FC<IconProps> = ({
  width = 24,
  height = 25,
  className,
  fillColor = "#333333",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6.5L18 18.5"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6.5L6 18.5"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
