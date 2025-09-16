import React from "react";
import { TextField } from "@/components/TextField/TextField";
import { ColumnType } from "@/types/Boards";
import { Button } from "@/components/ui/button";

type AddBoardItemProps = {
  id: number;
  columns: Omit<ColumnType, "boardId">[];
  setColumns: React.Dispatch<
    React.SetStateAction<Omit<ColumnType, "boardId">[]>
  >;
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
    <div>
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
