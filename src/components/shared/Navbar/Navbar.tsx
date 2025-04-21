"use client";

import React from "react";
import styles from "./Navbar.module.css";

import { BoardName } from "@/components/shared/Navbar/BoardName";
import KanbanLogoIcon from "@/icons/KanbanLogoIcon";
import { Button } from "@/components/shared/Button/Button";
import PlusIcon from "@/icons/PlusIcon";
import VerticalEllipsisIcon from "@/icons/VerticalEllipsisIcon";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { Menu } from "@/components/shared/Navbar/subcomponents/Menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const { activeBoardId } = useActiveBoard();

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.sub_container} onClick={handleMenuToggle}>
        <KanbanLogoIcon size={25} />
        <BoardName isMenuOpen={isMenuOpen} />
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
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </nav>
  );
}
