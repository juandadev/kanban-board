"use client";

import { Modal } from "@/components/Modal/Modal";
import { useModal } from "@/context/modalContext";
import { Button } from "@/components/Button/Button";

export function EditBoardModal() {
  const { closeModal } = useModal();

  return (
    <Modal type={"editBoard"}>
      <h2>Edit Board</h2>
      <Button onClick={closeModal}>Close</Button>
    </Modal>
  );
}
