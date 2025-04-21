import React from "react";
import styles from "./Menu.module.css";
import BoardIcon from "@/icons/BoardIcon";
import clsx from "clsx";

interface MenuItemProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "active";
}

const iconColors = {
  default: "#828FA3",
  primary: "#635FC7",
  active: "#FFFFFF",
};

export function MenuItem({
  children,
  variant = "default",
  className,
  ...restProps
}: MenuItemProps) {
  return (
    <div
      className={clsx(styles.menu_item_container, className)}
      data-variant={variant}
      {...restProps}
    >
      <div className={styles.menu_item_label}>
        <BoardIcon size={16} color={iconColors[variant]} />
        <p>{children}</p>
      </div>
    </div>
  );
}
