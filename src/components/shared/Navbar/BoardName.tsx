"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import styles from "./Navbar.module.css";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import KanbanTextLogoIcon from "@/icons/KanbanTextLogoIcon";

export function BoardName() {
  const { activeBoard } = useActiveBoard();

  return (
    <span className={styles.title}>
      {activeBoard?.name || <KanbanTextLogoIcon size={25} />}
      <ChevronDownIcon size={8} />
    </span>
  );
}
