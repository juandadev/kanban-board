"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import KanbanIcon from "@/icons/KanbanIcon";
import { Menu } from "@/components/Navbar/subcomponents/Menu";

export function Navbar() {
  const isMobile = useMediaQuery("(max-width: 375px)");
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const { activeBoard } = useActiveBoard();

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="p-4 md:px-6 md:py-4 lg:pl-6 lg:pr-8 lg:pt-5 lg:pb-7 bg-card text-card-foreground shadow-xs flex justify-between items-center">
      <Button
        variant="ghost"
        className="p-0 text-card-foreground rounded-none hover:bg-transparent"
      >
        <KanbanIcon size={25} />
        <div className="flex gap-2 items-center">
          <span className="lg:text-2xl text-lg font-bold">
            {activeBoard.name || "Kanban Board"}
          </span>
          {isMenuOpen ? (
            <ChevronUpIcon className="text-primary size-4" />
          ) : (
            <ChevronDownIcon className="text-primary size-4" />
          )}
        </div>
      </Button>
      <div className="flex gap-1 items-center">
        <Button size={isMobile ? "menu" : "default"}>
          <PlusIcon /> {!isMobile && "Add New Task"}
        </Button>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon />
        </Button>
      </div>
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </nav>
  );
}
