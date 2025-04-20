import React from "react";
import styles from "./Navbar.module.css";
import { Button } from "@/components/Button/Button";
import { BoardName } from "@/components/Navbar/BoardName";
import KanbanLogoIcon from "@/icons/KanbanLogoIcon";

export function Navbar() {
  return (
    <nav className={styles.container}>
      <div className={styles.sub_container}>
        <KanbanLogoIcon size={25} />
        <BoardName />
      </div>
      <div className={styles.sub_container}>
        <Button>New Board</Button>
        <Button>Options</Button>
      </div>
    </nav>
  );
}
