import React from "react";
import styles from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ children, ...restProps }: ButtonProps) {
  return (
    <button className={styles.button} {...restProps}>
      {children}
    </button>
  );
}
