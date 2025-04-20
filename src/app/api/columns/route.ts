import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Column } from "@/types";
import { castToColumns, castToColumn } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<Column[] | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("boardId");

  if (!boardId) {
    return NextResponse.json(
      { error: "Board ID is required" },
      { status: 400 },
    );
  }

  const columns = await prisma.columns.findMany({
    where: { board_id: boardId },
  });

  const typedColumns = castToColumns(columns);

  return NextResponse.json(typedColumns);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Column | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, board_id } = await request.json();

  if (!name || !board_id) {
    return NextResponse.json(
      { error: "Name and board_id are required" },
      { status: 400 },
    );
  }

  const board = await prisma.boards.findUnique({
    where: { id: board_id },
    include: { board_members: { where: { user_id: session.user.id } } },
  });

  if (
    !board ||
    (board.user_id !== session.user.id &&
      !board.board_members.some((m) => m.role === "edit" || m.role === "admin"))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const column = await prisma.columns.create({
    data: {
      name,
      board_id,
    },
  });
  const typedColumn = castToColumn(column);

  return NextResponse.json(typedColumn, { status: 201 });
}
