import {
  boards as PrismaBoard,
  columns as PrismaColumn,
  tasks as PrismaTask,
} from "@prisma/client";
import { Board, Column, Task, WorkSchedule } from "@/types";

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

export function castToColumn(prismaColumn: PrismaColumn): Column {
  return {
    ...prismaColumn,
    created_at: prismaColumn.created_at as Date,
    updated_at: prismaColumn.updated_at as Date,
  };
}

export function castToColumns(prismaColumns: PrismaColumn[]): Column[] {
  return prismaColumns.map(castToColumn);
}

export function castToTask(task: PrismaTask): Task {
  return {
    ...task,
    estimated_hours: task.estimated_hours as number | null,
    created_at: task.created_at as Date,
    updated_at: task.updated_at as Date,
  };
}

export function castToTasks(tasks: PrismaTask[]): Task[] {
  return tasks.map(castToTask);
}
