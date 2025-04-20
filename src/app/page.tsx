import React from "react";
import styles from "./page.module.css";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Board } from "@/components/views/Board/Board";

export default function Home() {
  return (
    <main className={styles.container}>
      <Navbar />
      <Board />
    </main>
  );
}
