import React from "react";
import styles from "./Menu.module.css";
import { MenuItem } from "@/components/shared/Navbar/subcomponents/MenuItem";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useModal } from "@/context/ModalContext";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  const { boards, activeBoardId } = useActiveBoard();
  const { openModal } = useModal();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleNewBoardClick = () => {
    handleMenuClose();
    openModal("createBoard");
  };

  if (!isMenuOpen) return null;

  return (
    <div className={styles.menu_overlay} onClick={handleMenuClose}>
      <div className={styles.menu_container} onClick={handleMenuClick}>
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
          <MenuItem
            aria-label={"Create new board"}
            variant={"primary"}
            onClick={handleNewBoardClick}
          >
            + Create New Board
          </MenuItem>
        </div>
        {/* TODO: Implement theme switcher here */}
      </div>
    </div>
  );
}
