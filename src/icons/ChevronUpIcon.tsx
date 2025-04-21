import React from "react";
import { IconProps } from "@/types/global";

const ChevronUpIcon = ({
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
    <path d="M9 6L5 2L1 6" stroke={color} strokeWidth={2} />
  </svg>
);
export default ChevronUpIcon;
