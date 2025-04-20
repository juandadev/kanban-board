// noinspection ExceptionCaughtLocallyJS

import { Board } from "@/types/board";

export async function getBoards(): Promise<Board[]> {
  const response = await fetch("/api/boards");

  try {
    if (!response.ok) {
      throw new Error("Failed to fetch boards");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    // TODO: Implement a better response structure for success and failure
    return [];
  }
}
