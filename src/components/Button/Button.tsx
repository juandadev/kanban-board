import React from "react";

type ButtonProps = React.ComponentProps<"button">;

export function Button({ children, ...restProps }: ButtonProps) {
  return <button {...restProps}>{children}</button>;
}
