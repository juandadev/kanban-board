"use client";

import React from "react";
import { BoardProvider } from "@/context/boardContext";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <BoardProvider>{children}</BoardProvider>;
}
