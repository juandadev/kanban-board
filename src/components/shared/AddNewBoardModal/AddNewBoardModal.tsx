import Modal from "@/components/shared/Modal/Modal";
import { TextField } from "@/components/shared/TextField/TextField";
import AddBoardColumns from "@/components/shared/AddNewBoardModal/subcomponents/BoardColumns/AddBoardColumns";
import React, { MutableRefObject, useRef, useState } from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { Button } from "@/components/shared/Button/Button";
import { useBoardContext } from "@/context/boards/BoardsContext";

type AddBoardColumnsRefType = {
  handleModalClose: () => void;
};

export function AddNewBoardModal() {
  const { activeBoard } = useActiveBoard();
  const { dispatch } = useBoardContext();
  const [boardName, setBoardName] = useState<string>(activeBoard?.name || "");
  const addBoardColumnsRef: MutableRefObject<AddBoardColumnsRefType | null> =
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
    <Modal type={"createBoard"}>
      <Modal.Title>Add New Board</Modal.Title>
      <Modal.Body>
        <TextField
          label={"Board Name"}
          id={"board-name"}
          value={boardName}
          onChange={handleBoardNameChange}
          placeholder={"e.g. Web Design"}
        />
        <AddBoardColumns ref={addBoardColumnsRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button size={"small"} fluid onClick={handleBoardSave}>
          Create New Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
