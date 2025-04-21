import React from "react";
import styles from "./Menu.module.css";
import { MenuItem } from "@/components/shared/Navbar/subcomponents/MenuItem";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export function Menu() {
  const { boards, activeBoardId } = useActiveBoard();

  return (
    <div className={styles.menu_overlay}>
      <div className={styles.menu_container}>
        <span className={styles.menu_title}>ALL BOARDS ({boards.length})</span>
        <div>
          {boards.map((board) => (
            <MenuItem
              key={board.id}
              variant={board.id == activeBoardId ? "active" : "default"}
            >
              {board.name}
            </MenuItem>
          ))}
          <MenuItem variant={"primary"}>+ Create New Board</MenuItem>
        </div>
        {/* TODO: Implement theme switcher here */}
      </div>
    </div>
  );
}
