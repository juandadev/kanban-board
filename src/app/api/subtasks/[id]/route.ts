import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Subtask } from "@/types/board";
import { RequestError } from "@/types/services";
import { getSession } from "@/lib/auth";
import { castToSubtask } from "@/lib/utils";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse<Subtask | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const subtask = await prisma.subtasks.findUnique({
    where: { id },
    include: {
      tasks: {
        include: {
          columns: true,
        },
      },
    },
  });

  if (!subtask) {
    return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
  }

  const boardId = subtask?.tasks?.columns?.board_id;
  const canEdit = hasPermission(prisma, session, boardId, "edit", "PATCH");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, is_completed, task_id } = await request.json();

  if (!title || !is_completed || !task_id) {
    return NextResponse.json(
      { error: "Title, or complete status or task is required" },
      { status: 400 },
    );
  }

  const updatedSubtask = await prisma.subtasks.update({
    where: { id },
    data: { title, is_completed, task_id },
  });
  const typedSubtask = castToSubtask(updatedSubtask);

  return NextResponse.json(typedSubtask);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse<Subtask | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const subtask = await prisma.subtasks.findUnique({
    where: { id },
    include: {
      tasks: {
        include: {
          columns: true,
        },
      },
    },
  });

  if (!subtask) {
    return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
  }

  const boardId = subtask?.tasks?.columns?.board_id;
  const canEdit = hasPermission(prisma, session, boardId, "edit", "DELETE");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedSubtask = await prisma.subtasks.delete({
    where: { id },
  });
  const typedSubtask = castToSubtask(deletedSubtask);

  return NextResponse.json(typedSubtask);
}
