import React from "react";
import { IconProps } from "@/types/global";

const CrossIcon = ({ size, color = "#828FA3", ...restProps }: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <rect
      x={12.728}
      width={3}
      height={18}
      transform="rotate(45 12.728 0)"
      fill={color}
    />
    <rect
      y={2.12134}
      width={3}
      height={18}
      transform="rotate(-45 0 2.12134)"
      fill={color}
    />
  </svg>
);
export default CrossIcon;
