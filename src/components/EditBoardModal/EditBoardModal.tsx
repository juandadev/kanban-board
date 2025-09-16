import { Modal } from "@/components/Modal/Modal";
import { AddBoardColumns } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns";
import React, { RefObject, useRef, useState } from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBoardContext } from "@/context/boards/BoardsContext";
import { TextField } from "@/components/TextField/TextField";

type AddBoardColumnsRefType = {
  handleModalClose: () => void;
};

export function EditBoardModal() {
  const { activeBoard } = useActiveBoard();
  const { dispatch } = useBoardContext();
  const [boardName, setBoardName] = useState<string>(activeBoard.name);
  const addBoardColumnsRef: RefObject<AddBoardColumnsRefType | null> =
    useRef(null);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleBoardSave: React.MouseEventHandler<HTMLButtonElement> = () => {
    addBoardColumnsRef.current?.handleModalClose();

    // TODO: Check this logic to match the insertion from database
    dispatch({
      type: "UPDATE_BOARD_NAME",
      payload: { name: boardName },
    });
  };

  return (
    <Modal type="editBoard">
      <DialogHeader>
        <DialogTitle>Edit Board</DialogTitle>
        <DialogDescription className="sr-only">
          Add, modify or delete board columns
        </DialogDescription>
      </DialogHeader>
      <TextField
        label="Board Name"
        id="board-name"
        value={boardName}
        placeholder="e.g. Web Design"
        onChange={handleBoardNameChange}
      />
      <AddBoardColumns ref={addBoardColumnsRef} />
      <DialogFooter>
        <Button className="w-full" onClick={handleBoardSave}>
          Save Changes
        </Button>
      </DialogFooter>
    </Modal>
  );
}
