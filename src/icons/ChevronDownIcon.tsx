import React from "react";
import { IconProps } from "@/types/global";

const ChevronDownIcon = ({
  size,
  color = "#635FC7",
  ...restProps
}: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 9 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path d="M1 1L5 5L9 1" stroke={color} strokeWidth={2} />
  </svg>
);
export default ChevronDownIcon;
