import React from "react";
import styles from "./Navbar.module.css";
import { Button } from "@/components/shared/Button/Button";
import { BoardName } from "@/components/shared/Navbar/BoardName";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <BoardName />
      <Button>New Board</Button>
      <Button>Options</Button>
    </nav>
  );
}
