import React from "react";
import styles from "./Menu.module.css";
import BoardIcon from "@/icons/BoardIcon";

interface MenuItemProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "active";
}

const iconColors = {
  default: "#828FA3",
  primary: "#635FC7",
  active: "#FFFFFF",
};

export function MenuItem({ children, variant = "default" }: MenuItemProps) {
  return (
    <div className={styles.menu_item_container} data-variant={variant}>
      <div className={styles.menu_item_label}>
        <BoardIcon size={16} color={iconColors[variant]} />
        {children}
      </div>
    </div>
  );
}
