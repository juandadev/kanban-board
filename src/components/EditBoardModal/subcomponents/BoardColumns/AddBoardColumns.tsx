import { Button } from "@/components/Button/Button";
import styles from "./AddBoardColumns.module.css";
import React, { useState } from "react";
import { AddBoardItem } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { useModal } from "@/context/modalContext";
import { useBoardContext } from "@/context/boardContext";
import { ColumnType } from "@/types/Boards";

export function AddBoardColumns() {
  const [columns, setColumns] = useState<Omit<ColumnType, "boardId">[]>([]);
  const { closeModal } = useModal();
  const { dispatch } = useBoardContext();

  const handleModalClose = () => {
    dispatch({
      type: "ADD_COLUMNS",
      payload: { columns },
    });
    closeModal();
  };

  const handleAddColumn = () => {
    setColumns((prevState) => {
      const columnId = prevState.length + 1;
      const newColumnObj: Omit<ColumnType, "boardId"> = {
        id: columnId,
        name: "",
      };

      return [...prevState, newColumnObj];
    });
  };

  return (
    <div className={styles.container}>
      <span>Board Columns</span>
      {columns.map((column) => (
        <AddBoardItem
          key={column.id}
          id={column.id}
          columns={columns}
          setColumns={setColumns}
        />
      ))}
      <Button onClick={handleAddColumn}>+ Add New Column</Button>
      <Button onClick={handleModalClose}>Save Changes</Button>
    </div>
  );
}
