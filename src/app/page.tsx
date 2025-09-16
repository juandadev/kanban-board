import React from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Board } from "@/components/Board/Board";

export default function Home() {
  return (
    <main className="h-dvh">
      <Navbar />
      <Board />
    </main>
  );
}
