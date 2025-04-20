import { Button } from "@/components/Button/Button";
import styles from "./AddBoardColumns.module.css";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AddBoardItem } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { useModal } from "@/context/modalContext";
import { useBoardContext } from "@/context/boardContext";
import { Column } from "@/types/boards";

const AddBoardColumns = forwardRef((props, ref) => {
  const [columns, setColumns] = useState<Omit<Column, "boardId">[]>([]);
  const { closeModal } = useModal();
  const { dispatch } = useBoardContext();

  const handleModalClose = () => {
    dispatch({
      type: "UPDATE_COLUMNS",
      payload: { columns },
    });
    closeModal();
  };

  const handleAddColumn = () => {
    setColumns((prevState) => {
      const columnId = prevState.length + 1;
      const newColumnObj: Omit<Column, "boardId"> = {
        id: columnId,
        name: "",
      };

      return [...prevState, newColumnObj];
    });
  };

  useImperativeHandle(ref, () => ({
    handleModalClose,
  }));

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
    </div>
  );
});

AddBoardColumns.displayName = "AddBoardColumns";

export default AddBoardColumns;
