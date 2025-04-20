import React from "react";
import styles from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns.module.css";
import { TextField } from "@/components/TextField/TextField";
import { Button } from "@/components/Button/Button";
import { Column } from "@/types/boards";

type AddBoardItemProps = {
  id: number;
  columns: Omit<Column, "boardId">[];
  setColumns: React.Dispatch<React.SetStateAction<Omit<Column, "boardId">[]>>;
};

export function AddBoardItem({ id, columns, setColumns }: AddBoardItemProps) {
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
      />
      <Button id={id.toString()} onClick={handleRemoveColumn}>
        X
      </Button>
    </div>
  );
}
