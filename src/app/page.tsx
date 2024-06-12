import React from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Board } from "@/components/Board/Board";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <Navbar />
      <Board />
    </main>
  );
}
