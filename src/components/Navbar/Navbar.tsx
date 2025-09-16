import React from "react";
import styles from "./Navbar.module.css";
import { BoardName } from "@/components/Navbar/BoardName";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <BoardName />
      <Button>New Board</Button>
      <Button>Options</Button>
    </nav>
  );
}
