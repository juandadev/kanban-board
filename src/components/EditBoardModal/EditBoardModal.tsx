import { Modal } from "@/components/Modal/Modal";
import styles from "./EditBoardModal.module.css";
import { TextField } from "@/components/TextField/TextField";
import { AddBoardColumns } from "@/components/EditBoardModal/subcomponents/BoardColumns/AddBoardColumns";

export function EditBoardModal() {
  return (
    <Modal type={"editBoard"}>
      <div className={styles.modal_container}>
        <h2>Edit Board</h2>
        <div className={styles.form_container}>
          <TextField label={"Board Name"} id={"board-name"} />
        </div>
        <AddBoardColumns />
      </div>
    </Modal>
  );
}
