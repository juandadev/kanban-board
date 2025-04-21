import React from "react";
import styles from "@/components/shared/AddNewBoardModal/subcomponents/BoardColumns/AddBoardColumns.module.css";
import { TextField } from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";
import CrossIcon from "@/icons/CrossIcon";
import { Control, Controller } from "react-hook-form";
import { REQUIRED_FIELD } from "@/lib/validation-texts";
import { NewBoardValues } from "@/components/shared/AddNewBoardModal/AddNewBoardModal";

type AddBoardItemProps = {
  id: string;
  placeholder: string;
  index: number;
  control: Control<NewBoardValues>;
  remove: (_index: number) => void;
};

export function AddBoardItem({
  id,
  placeholder,
  index,
  control,
  remove,
}: AddBoardItemProps) {
  const handleRemoveColumn = () => {
    remove(index);
  };

  return (
    <div className={styles.add_column_item}>
      <Controller
        control={control}
        name={`columns.${index}.name`}
        defaultValue=""
        rules={{ required: REQUIRED_FIELD }}
        render={({ field, fieldState }) => (
          <TextField
            id={id}
            placeholder={`e.g. ${placeholder}`}
            data-error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Button
        id={id.toString()}
        aria-label={"Remove column"}
        variant={"transparent"}
        onClick={handleRemoveColumn}
      >
        <CrossIcon style={{ pointerEvents: "none" }} size={14} />
      </Button>
    </div>
  );
}
