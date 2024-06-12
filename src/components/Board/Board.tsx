import React from "react";

import styles from "./Board.module.css";
import { Button } from "@/components/Button/Button";

export function Board() {
  return (
    <section className={styles.container}>
      <div className={styles.emptyColumn}>
        <p>This board is empty. Create a new column to get started.</p>
        <Button>Add new Column</Button>
      </div>
    </section>
  );
}
