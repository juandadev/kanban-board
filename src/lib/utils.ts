import {
  boards as PrismaBoard,
  columns as PrismaColumn,
  tasks as PrismaTask,
  subtasks as PrismaSubtask,
  board_members as PrismaBoardMembers,
  users as PrismaUsers,
  invitations as PrismaInvitation,
} from "@prisma/client";
import {
  Board,
  BoardMember,
  BoardMemberWithUser,
  Column,
  Invitation,
  Subtask,
  Task,
  WorkSchedule,
} from "@/types";

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

export function castToSubtask(subtask: PrismaSubtask): Subtask {
  return {
    ...subtask,
    created_at: subtask.created_at as Date,
    updated_at: subtask.updated_at as Date,
  };
}

export function castToSubtasks(subtasks: PrismaSubtask[]): Subtask[] {
  return subtasks.map(castToSubtask);
}

type PrismaBoardMembersWithUser = PrismaBoardMembers & {
  users: Pick<PrismaUsers, "email" | "name">;
};

export function castToMember(member: PrismaBoardMembers): BoardMember {
  return {
    ...member,
    created_at: member.created_at as Date,
    updated_at: member.updated_at as Date,
  };
}

export function castToMembers(
  members: PrismaBoardMembersWithUser[],
): BoardMemberWithUser[] {
  return members.map((member) => ({
    ...member,
    created_at: member.created_at as Date,
    updated_at: member.updated_at as Date,
  }));
}

export function castToInvitation(invitation: PrismaInvitation): Invitation {
  return {
    ...invitation,
    expires_at: invitation.expires_at as Date,
    created_at: invitation.created_at as Date,
    updated_at: invitation.updated_at as Date,
  };
}
