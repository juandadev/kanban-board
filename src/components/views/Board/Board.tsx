"use client";

import React from "react";
import styles from "./Board.module.css";
import { Button } from "@/components/shared/Button/Button";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useModal } from "@/context/ModalContext";
import { AddNewBoardModal } from "@/components/shared/AddNewBoardModal/AddNewBoardModal";

export function Board() {
  const { activeBoard, activeBoardId } = useActiveBoard();
  const { openModal } = useModal();

  const renderColumns =
    activeBoard.columns.map((column) => (
      <div key={column.id} className={styles.column}>
        {column.name}
      </div>
    )) || [];

  if (!activeBoardId) {
    return (
      <>
        <section className={styles.container}>
          <div className={styles.emptyColumn}>
            <p>
              There is no selected board. Select one from the menu or create a
              new one
            </p>
            <Button onClick={() => openModal("createBoard")}>
              Create New Board
            </Button>
          </div>
        </section>
        <AddNewBoardModal />
      </>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.emptyColumn}>
        {activeBoard.columns.length === 0 ? (
          <>
            <p>This board is empty. Create a new column to get started.</p>
            <Button>Add new Column</Button>
          </>
        ) : (
          renderColumns
        )}
      </div>
    </section>
  );
}
