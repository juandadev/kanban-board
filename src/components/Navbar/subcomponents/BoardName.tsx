"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import styles from "./Navbar.module.css";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import KanbanTextLogoIcon from "@/icons/KanbanTextLogoIcon";
import ChevronUpIcon from "@/icons/ChevronUpIcon";

export function BoardName({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { activeBoard } = useActiveBoard();

  return (
    <span className={styles.title}>
      {activeBoard?.name || <KanbanTextLogoIcon size={25} />}
      {isMenuOpen ? <ChevronUpIcon size={7} /> : <ChevronDownIcon size={7} />}
    </span>
  );
}
