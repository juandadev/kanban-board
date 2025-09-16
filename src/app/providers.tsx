"use client";

import React from "react";
import { BoardProvider } from "@/context/boards/BoardsContext";
import { ModalProvider } from "@/context/ModalContext";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <BoardProvider>
      <ModalProvider>{children}</ModalProvider>
    </BoardProvider>
  );
}
