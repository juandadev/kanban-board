import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/types/boards";
import { RequestError } from "@/types/services";
import { getSession } from "@/lib/auth";
import { castToTask } from "@/lib/utils";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse<Task | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const task = await prisma.tasks.findUnique({
    where: { id },
    include: {
      columns: true,
    },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const boardId = task?.columns?.board_id;
  const canEdit = hasPermission(prisma, session, boardId, "edit", "PATCH");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, description, status, column_id, estimated_hours } =
    await request.json();

  if (!title || !description || !status || !column_id || !estimated_hours) {
    return NextResponse.json(
      {
        error:
          "Title or description or status or column or estimated hours is required",
      },
      { status: 400 },
    );
  }

  const updatedTask = await prisma.tasks.update({
    where: { id },
    data: { title, description, status, column_id, estimated_hours },
  });
  const typedTask = castToTask(updatedTask);

  return NextResponse.json(typedTask);
}

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse<Task | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const task = await prisma.tasks.findUnique({
    where: { id },
    include: {
      columns: true,
    },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const canEdit = hasPermission(
    prisma,
    session,
    task.columns.board_id,
    "edit",
    "DELETE",
  );

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedTask = await prisma.tasks.delete({
    where: { id },
  });
  const typedTask = castToTask(deletedTask);

  return NextResponse.json(typedTask);
}
