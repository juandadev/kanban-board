import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Task } from "@/types/board";
import { castToTask, castToTasks } from "@/lib/utils";
import { RequestError } from "@/types/services";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Task[] | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const columnId = searchParams.get("columnId");

  if (!columnId) {
    return NextResponse.json(
      { error: "Column ID is required" },
      { status: 400 },
    );
  }

  const tasks = await prisma.tasks.findMany({
    where: { column_id: columnId },
    include: {
      columns: true,
    },
  });

  const boardId = tasks[0]?.columns?.board_id;
  const canView = hasPermission(prisma, session, boardId, "read_only", "GET");

  if (!canView) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const typedTasks = castToTasks(tasks);

  return NextResponse.json(typedTasks);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Task | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, status, column_id, estimated_hours } =
    await request.json();

  if (!title || !column_id) {
    return NextResponse.json(
      { error: "Title and column_id are required" },
      { status: 400 },
    );
  }

  const column = await prisma.columns.findUnique({
    where: { id: column_id },
    include: {
      boards: {
        include: { board_members: { where: { user_id: session.user.id } } },
      },
    },
  });

  if (
    !column ||
    (column.boards.user_id !== session.user.id &&
      !column.boards.board_members.some(
        (m) => m.role === "edit" || m.role === "admin",
      ))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const boardId = column.board_id;
  const canEdit = hasPermission(prisma, session, boardId, "edit", "POST");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const task = await prisma.tasks.create({
    data: {
      title,
      description: description ?? null,
      status: status ?? null,
      column_id,
      estimated_hours: estimated_hours ?? null,
    },
  });
  const typedTask = castToTask(task);

  return NextResponse.json(typedTask, { status: 201 });
}
