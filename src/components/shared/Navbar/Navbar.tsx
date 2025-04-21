"use client";

import React from "react";
import styles from "./Navbar.module.css";

import { BoardName } from "@/components/shared/Navbar/BoardName";
import KanbanLogoIcon from "@/icons/KanbanLogoIcon";
import { Button } from "@/components/shared/Button/Button";
import PlusIcon from "@/icons/PlusIcon";
import VerticalEllipsisIcon from "@/icons/VerticalEllipsisIcon";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export function Navbar() {
  const { activeBoardId } = useActiveBoard();

  return (
    <nav className={styles.container}>
      <div className={styles.sub_container}>
        <KanbanLogoIcon size={25} />
        <BoardName />
      </div>
      <div className={styles.sub_container}>
        <Button
          aria-label={"Add new task"}
          size={"small"}
          disabled={!activeBoardId}
        >
          <PlusIcon size={12} />
        </Button>
        <Button variant={"transparent"} disabled={!activeBoardId}>
          <VerticalEllipsisIcon size={20} />
        </Button>
      </div>
    </nav>
  );
}
