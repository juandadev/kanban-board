import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "large";
  fluid?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "large",
  fluid = false,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      data-variant={variant}
      data-size={size}
      data-fluid={fluid}
      {...restProps}
    >
      {children}
    </button>
  );
}
