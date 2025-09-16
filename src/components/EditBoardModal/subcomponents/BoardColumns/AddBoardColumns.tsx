import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AddBoardItem } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { useModal } from "@/context/modalContext";
import { useBoardContext } from "@/context/boardContext";
import { ColumnType } from "@/types/Boards";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";

export const AddBoardColumns = forwardRef((props, ref) => {
  const [columns, setColumns] = useState<Omit<ColumnType, "boardId">[]>([]);
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
      const newColumnObj: Omit<ColumnType, "boardId"> = {
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
    <div className="space-y-2">
      <Label asChild>
        <span>Board Columns</span>
      </Label>
      <div className="space-y-3">
        {columns.map((column) => (
          <AddBoardItem
            key={column.id}
            id={column.id}
            columns={columns}
            setColumns={setColumns}
          />
        ))}
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleAddColumn}
        >
          <PlusIcon />
          Add New Column
        </Button>
      </div>
    </div>
  );
});
