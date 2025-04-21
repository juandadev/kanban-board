import React from "react";
import Modal from "@/components/shared/Modal/Modal";
import { TextField } from "@/components/shared/TextField/TextField";
import { AddBoardColumns } from "@/components/shared/AddNewBoardModal/subcomponents/BoardColumns/AddBoardColumns";
import { Button } from "@/components/shared/Button/Button";
import styles from "./AddNewBoardModal.module.css";
import { NewBoardColumn } from "@/types/board";
import { Controller, useForm } from "react-hook-form";
import { REQUIRED_FIELD } from "@/lib/validation-texts";
import { useModal } from "@/context/ModalContext";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export interface NewBoardValues {
  "board-name": string;
  columns: NewBoardColumn[];
}

export function AddNewBoardModal() {
  const { handleSubmit, control, reset } = useForm<NewBoardValues>();
  const { closeModal } = useModal();
  const { createBoard } = useActiveBoard();

  const handleBoardSave: React.MouseEventHandler<HTMLButtonElement> = () => {};

  const onSubmit = (data: NewBoardValues) => {
    console.log("Form data:", data);
    createBoard({ name: data["board-name"] });
    reset();
    closeModal();
  };

  return (
    <Modal type={"createBoard"}>
      <Modal.Title>Add New Board</Modal.Title>
      <Modal.Body>
        <form
          id={"create-board-form"}
          className={styles.form_container}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="board-name"
            control={control}
            defaultValue=""
            rules={{ required: REQUIRED_FIELD }}
            render={({ field, fieldState }) => (
              <TextField
                id={"board-name"}
                label={"Board Name"}
                placeholder={"e.g. Web Design"}
                data-error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <AddBoardColumns control={control} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size={"small"}
          fluid
          onClick={handleBoardSave}
          type={"submit"}
          form={"create-board-form"}
        >
          Create New Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
