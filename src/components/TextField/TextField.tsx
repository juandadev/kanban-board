import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type TextFieldProps = React.ComponentProps<"input"> & {
  label?: string;
};

export function TextField({ id, label, ...restProps }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type="text" {...restProps} />
    </div>
  );
}
