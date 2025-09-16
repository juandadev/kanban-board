import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { NewBoardColumn } from "@/types/board";
import { Button } from "@/components/ui/button";
import { AddBoardItem } from "@/components/AddNewBoardModal/subcomponents/BoardColumns/AddBoardItem";

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
    <div>
      <span>Board Columns</span>
      {columns.map((column) => (
        <AddBoardItem
          key={column.id}
          id={column.id}
          columns={columns}
          setColumns={setColumns}
          placeholder={columnWords[column.id - 1]}
        />
      ))}
      <Button variant="secondary" size="sm" onClick={handleAddColumn}>
        + Add New Column
      </Button>
    </div>
  );
});

AddBoardColumns.displayName = "AddBoardColumns";

export default AddBoardColumns;
