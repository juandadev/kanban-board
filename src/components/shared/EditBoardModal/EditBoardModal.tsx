import { Modal } from "@/components/shared/Modal/Modal";
import styles from "./EditBoardModal.module.css";
import { TextField } from "@/components/shared/TextField/TextField";
import AddBoardColumns from "@/components/shared/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns";
import React, { MutableRefObject, useRef, useState } from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { Button } from "@/components/shared/Button/Button";
import { useBoardContext } from "@/context/boards/BoardsContext";

type AddBoardColumnsRefType = {
  handleModalClose: () => void;
};

export function EditBoardModal() {
  const { board } = useActiveBoard();
  const { dispatch } = useBoardContext();
  const [boardName, setBoardName] = useState<string>(board?.name || "");
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
    <Modal type={"editBoard"}>
      <div className={styles.modal_container}>
        <h2>Edit Board</h2>
        <div className={styles.form_container}>
          <TextField
            label={"Boards Name"}
            id={"board-name"}
            value={boardName}
            onChange={handleBoardNameChange}
          />
        </div>
        <AddBoardColumns ref={addBoardColumnsRef} />
        <Button onClick={handleBoardSave}>Save Changes</Button>
      </div>
    </Modal>
  );
}
