import React from "react";
import styles from "./TextField.module.css";

type TextFieldProps = React.ComponentProps<"input"> & {
  id: string;
  label?: string;
  errorMessage?: string;
};

export function TextField({
  id,
  label,
  errorMessage,
  ...restProps
}: TextFieldProps) {
  return (
    <div className={styles.field_container}>
      {label && (
        <label className={styles.field_label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        data-error={false}
        className={styles.field_input}
        id={id}
        type="text"
        {...restProps}
      />
      {errorMessage && (
        <span className={styles.field_error_message}>{errorMessage}</span>
      )}
    </div>
  );
}
