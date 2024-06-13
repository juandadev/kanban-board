import React from "react";
import styles from "./Navbar.module.css";
import { Button } from "@/components/Button/Button";
import { BoardName } from "@/components/Navbar/BoardName";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <BoardName />
      <Button>New Board</Button>
      <Button>Options</Button>
    </nav>
  );
}
