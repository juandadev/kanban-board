import { Button } from "@/components/shared/Button/Button";
import styles from "./AddBoardColumns.module.css";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AddBoardItem } from "@/components/shared/EditBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { useModal } from "@/context/ModalContext";
import { NewBoardColumn } from "@/types/board";

const columnWords = [
  "Todo",
  "Doing",
  "Done",
  "Backlog",
  "In Progress",
  "Review",
  "Blocked",
  "Testing",
  "Ready",
  "Deployed",
  "Planning",
  "Research",
  "Design",
  "Development",
  "QA",
  "Staging",
  "Production",
  "Awaiting Feedback",
  "On Hold",
  "Completed",
];

const AddBoardColumns = forwardRef((props, ref) => {
  const [columns, setColumns] = useState<NewBoardColumn[]>([]);
  const { closeModal } = useModal();

  const handleModalClose = () => {
    closeModal();
  };

  const handleAddColumn = () => {
    setColumns((prevState) => {
      const columnId = prevState.length + 1;
      const newColumnObj: NewBoardColumn = {
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
      <span className={styles.title}>Board Columns</span>
      {columns.map((column) => (
        <AddBoardItem
          key={column.id}
          id={column.id}
          columns={columns}
          setColumns={setColumns}
          placeholder={columnWords[column.id - 1]}
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
