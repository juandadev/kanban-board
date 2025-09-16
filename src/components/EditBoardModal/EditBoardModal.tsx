import { Modal } from "@/components/Modal/Modal";
import { TextField } from "@/components/TextField/TextField";
import { AddBoardColumns } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns";
import React, { RefObject, useRef, useState } from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useBoardContext } from "@/context/boardContext";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AddBoardColumnsRefType = {
  handleModalClose: () => void;
};

export function EditBoardModal() {
  const { board } = useActiveBoard();
  const { dispatch } = useBoardContext();
  const [boardName, setBoardName] = useState<string>(board?.name || "");
  const addBoardColumnsRef: RefObject<AddBoardColumnsRefType | null> =
    useRef(null);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleBoardSave: React.MouseEventHandler<HTMLButtonElement> = () => {
    addBoardColumnsRef.current?.handleModalClose();

    dispatch({
      type: "UPDATE_BOARD_NAME",
      payload: { name: boardName },
    });
  };

  return (
    <Modal type="editBoard" aria-description="Edit board columns">
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
