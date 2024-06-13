"use client";

import React from "react";
import styles from "./Board.module.css";
import { Button } from "@/components/Button/Button";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export function Board() {
  const { board } = useActiveBoard();

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
    <section className={styles.container}>
      <div className={styles.emptyColumn}>
        <p>This board is empty. Create a new column to get started.</p>
        <Button>Add new Column</Button>
      </div>
    </section>
  );
}
