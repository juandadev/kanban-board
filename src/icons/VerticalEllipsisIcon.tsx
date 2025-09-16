import React from "react";
import { IconProps } from "@/types/global";

const VerticalEllipsisIcon = ({
  size,
  color = "#828FA3",
  ...restProps
}: IconProps) => (
  <svg
    height={size}
    viewBox="0 0 5 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <circle cx={2.30769} cy={2.30769} r={2.30769} fill={color} />
    <circle cx={2.30769} cy={10.0001} r={2.30769} fill={color} />
    <circle cx={2.30769} cy={17.6925} r={2.30769} fill={color} />
  </svg>
);
export default VerticalEllipsisIcon;
