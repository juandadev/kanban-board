"use client";

import React from "react";
import { BoardProvider } from "@/context/boardContext";
import { ModalProvider } from "@/context/modalContext";

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
