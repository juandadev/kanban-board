"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";

export function BoardName() {
  const { board } = useActiveBoard();

  return <span>{board?.name || "Kanban Boards"}</span>;
}
