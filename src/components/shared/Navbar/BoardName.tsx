"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import styles from "./Navbar.module.css";
import ChevronDownIcon from "@/icons/ChevronDownIcon";

export function BoardName() {
  const { board } = useActiveBoard();

  return (
    <span className={styles.title}>
      {board?.name || "Kanban Board"}
      <ChevronDownIcon size={7} />
    </span>
  );
}
