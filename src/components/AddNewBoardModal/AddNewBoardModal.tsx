import React, { RefObject, useRef, useState } from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useBoardContext } from "@/context/boards/BoardsContext";
import { Modal } from "@/components/Modal/Modal";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/TextField/TextField";
import AddBoardColumns from "@/components/AddNewBoardModal/subcomponents/BoardColumns/AddBoardColumns";

type AddBoardColumnsRefType = {
  handleModalClose: () => void;
};

export function AddNewBoardModal() {
  const { activeBoard } = useActiveBoard();
  const { dispatch } = useBoardContext();
  const [boardName, setBoardName] = useState<string>(activeBoard?.name || "");
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
    <Modal type="createBoard">
      <DialogHeader>
        <DialogTitle>Add New Board</DialogTitle>
        <DialogDescription className="sr-only">
          Create a new board
        </DialogDescription>
      </DialogHeader>
      <TextField
        label="Board Name"
        id="board-name"
        value={boardName}
        placeholder={"e.g. Web Design"}
        onChange={handleBoardNameChange}
      />
      <AddBoardColumns ref={addBoardColumnsRef} />
      <DialogFooter>
        <Button className="w-full" onClick={handleBoardSave}>
          Create New Board
        </Button>
      </DialogFooter>
    </Modal>
  );
}
