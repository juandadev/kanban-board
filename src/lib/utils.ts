import { boards as PrismaBoard } from "@prisma/client";
import { Board, WorkSchedule } from "@/types";

export function castToBoard(prismaBoard: PrismaBoard): Board {
  return {
    ...prismaBoard,
    work_schedule: prismaBoard.work_schedule as WorkSchedule | null,
    created_at: prismaBoard.created_at as Date,
    updated_at: prismaBoard.updated_at as Date,
  };
}

export function castToBoards(prismaBoards: PrismaBoard[]): Board[] {
  return prismaBoards.map(castToBoard);
}
