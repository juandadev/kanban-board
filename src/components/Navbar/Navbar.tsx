import React from "react";
import styles from "./Navbar.module.css";
import { Button } from "@/components/Button/Button";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <span>Board name</span>
      <Button>New Board</Button>
      <Button>Options</Button>
    </nav>
  );
}
