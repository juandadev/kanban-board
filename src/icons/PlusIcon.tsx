import React from "react";
import { IconProps } from "@/types/global";

const PlusIcon = ({ size, color = "#ffffff", ...restProps }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z"
      fill={color}
    />
  </svg>
);
export default PlusIcon;
