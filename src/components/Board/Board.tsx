"use client";

import React from "react";
import styles from "./Board.module.css";
import { Button } from "@/components/Button/Button";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useModal } from "@/context/modalContext";
import { EditBoardModal } from "@/components/EditBoardModal/EditBoardModal";

export function Board() {
  const { board, columns } = useActiveBoard();
  const { openModal } = useModal();

  const renderColumns = columns.map((column) => (
    <div key={column.id} className={styles.column}>
      {column.name}
    </div>
  ));

  if (!board) {
    return (
      <section className={styles.container}>
        <div className={styles.emptyColumn}>
          <p>
            There is no selected board. Select one from the menu or create a new
            one
          </p>
          <Button>Create New Board</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <div className={styles.emptyColumn}>
          {columns.length === 0 ? (
            <>
              <p>This board is empty. Create a new column to get started.</p>
              <Button onClick={() => openModal("editBoard")}>
                Add new Column
              </Button>
            </>
          ) : (
            renderColumns
          )}
        </div>
      </section>
      <EditBoardModal />
    </>
  );
}
