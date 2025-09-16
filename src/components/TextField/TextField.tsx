import React from "react";

type TextFieldProps = React.ComponentProps<"input"> & {
  label?: string;
};

export function TextField({ id, label, ...restProps }: TextFieldProps) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type="text" {...restProps} />
    </div>
  );
}
