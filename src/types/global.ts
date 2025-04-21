import React from "react";

export type IconProps = React.ComponentProps<"svg"> & {
  size: number;
  color?: string;
};
