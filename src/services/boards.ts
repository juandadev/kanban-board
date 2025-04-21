// noinspection ExceptionCaughtLocallyJS

import {
  GenericErrorResponse,
  GetBoardsByIdResponse,
  GetBoardsResponse,
} from "@/types/services";

export async function getBoards(): Promise<
  GetBoardsResponse | GenericErrorResponse
> {
  const response = await fetch("/api/boards");

  try {
    if (!response.ok) {
      throw new Error("Failed to fetch boards");
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      message: error instanceof Error ? error.message : String(error),
      payload: {},
    };
  }
}

export async function getBoardById(
  id: string,
): Promise<GetBoardsByIdResponse | GenericErrorResponse> {
  const response = await fetch(`/api/boards/${id}`);

  try {
    if (!response.ok) {
      throw new Error(`Failed to fetch board with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      message: error instanceof Error ? error.message : String(error),
      payload: {},
    };
  }
}
