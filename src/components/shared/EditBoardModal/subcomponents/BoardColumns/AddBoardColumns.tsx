import { Button } from "@/components/shared/Button/Button";
import styles from "./AddBoardColumns.module.css";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AddBoardItem } from "@/components/shared/EditBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { useModal } from "@/context/ModalContext";
import { useBoardContext } from "@/context/boards/BoardsContext";
import { Column } from "@/types/board";

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
    // TODO: Fix this
    // setColumns((prevState) => {
    //   const columnId = prevState.length + 1;
    //   const newColumnObj: Omit<Column, "boardId"> = {
    //     id: columnId.toString(),
    //     name: "",
    //   };
    //
    //   return [...prevState, newColumnObj];
    // });
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
      <Button variant={"secondary"} size={"small"} onClick={handleAddColumn}>
        + Add New Column
      </Button>
    </div>
  );
});

AddBoardColumns.displayName = "AddBoardColumns";

export default AddBoardColumns;
