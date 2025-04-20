import React from "react";
import styles from "@/components/shared/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns.module.css";
import { TextField } from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";
import { Column } from "@/types/board";

type AddBoardItemProps = {
  id: string;
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
      return prevState.filter((column) => column.id !== targetId);
    });
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id: targetId } = event.target as HTMLButtonElement;

    setColumns((prevState) => {
      return prevState.map((column) => {
        if (column.id === targetId) {
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
