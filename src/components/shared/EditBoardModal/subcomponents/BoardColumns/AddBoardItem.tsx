import React from "react";
import styles from "@/components/shared/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns.module.css";
import { TextField } from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";
import { NewBoardColumn } from "@/types/board";
import CrossIcon from "@/icons/CrossIcon";

type AddBoardItemProps = {
  id: number;
  columns: NewBoardColumn[];
  setColumns: React.Dispatch<React.SetStateAction<NewBoardColumn[]>>;
  placeholder: string;
};

export function AddBoardItem({
  id,
  columns,
  setColumns,
  placeholder,
}: AddBoardItemProps) {
  const columnValue = columns.find((column) => column.id === id)?.name;

  const handleRemoveColumn: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const { id: targetId } = event.target as HTMLButtonElement;

    setColumns((prevState) => {
      return prevState.filter((column) => column.id !== parseInt(targetId));
    });
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id: targetId } = event.target as HTMLButtonElement;

    setColumns((prevState) => {
      return prevState.map((column) => {
        if (column.id === parseInt(targetId)) {
          return {
            ...column,
            name: event.target.value,
          };
        }
        return column;
      });
    });
  };

  return (
    <div className={styles.add_column_item}>
      <TextField
        id={id.toString()}
        value={columnValue}
        onChange={handleColumnChange}
        placeholder={`e.g. ${placeholder}`}
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
