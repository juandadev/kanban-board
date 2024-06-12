"use client";

import React from "react";
import { Button } from "@/components/Button/Button";

import styles from "./Navbar.module.css";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export function Navbar() {
  const { board } = useActiveBoard();

  return (
    <nav className={styles.container}>
      <span>{board?.name || "Kanban Board"}</span>
      <Button>New Board</Button>
      <Button>Options</Button>
    </nav>
  );
}
