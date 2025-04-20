import React from "react";
import styles from "./TextField.module.css";

type TextFieldProps = React.ComponentProps<"input"> & {
  id: string;
  label?: string;
};

export function TextField({ id, label, ...restProps }: TextFieldProps) {
  return (
    <div className={styles.field_container}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type="text" {...restProps} />
    </div>
  );
}
