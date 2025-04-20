import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Subtask } from "@/types";
import { castToSubtask, castToSubtasks } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Subtask[] | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const subtasks = await prisma.subtasks.findMany({
    where: { task_id: taskId },
  });
  const typedSubtasks = castToSubtasks(subtasks);

  return NextResponse.json(typedSubtasks);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Subtask | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, is_completed, task_id } = await request.json();

  if (!title || !task_id) {
    return NextResponse.json(
      { error: "Title and task_id are required" },
      { status: 400 },
    );
  }

  const task = await prisma.tasks.findUnique({
    where: { id: task_id },
    include: {
      columns: {
        include: {
          boards: {
            include: { board_members: { where: { user_id: session.user.id } } },
          },
        },
      },
    },
  });

  if (
    !task ||
    (task.columns.boards.user_id !== session.user.id &&
      !task.columns.boards.board_members.some(
        (m) => m.role === "edit" || m.role === "admin",
      ))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subtask = await prisma.subtasks.create({
    data: {
      title,
      is_completed: is_completed ?? false,
      task_id,
    },
  });
  const typedSubtask = castToSubtask(subtask);

  return NextResponse.json(typedSubtask, { status: 201 });
}
