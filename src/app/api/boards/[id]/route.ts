import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ActiveBoard, Boards } from "@/types/boards";
import { getSession, Session } from "@/lib/auth";
import { RequestError } from "@/types/services";
import { castToBoard } from "@/lib/utils";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<ActiveBoard | RequestError>> {
  const session: Session | null = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const canView = hasPermission(prisma, session, id, "read_only", "GET");

  if (!canView) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const board = await prisma.boards.findUnique({
      where: { id },
      include: {
        board_members: true,
        invitations: true,
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });

    if (!board) {
      return NextResponse.json({ error: "Boards not found" }, { status: 404 });
    }

    const hasAccess = await prisma.boards.findFirst({
      where: {
        id,
        OR: [
          { user_id: session.user.id },
          { board_members: { some: { user_id: session.user.id } } },
        ],
      },
    });

    if (!hasAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // @ts-expect-error doesn't match with prisma schema
    return NextResponse.json(board);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Boards | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { name, work_schedule } = await request.json();
  const canEdit = hasPermission(prisma, session, id, "edit", "PATCH");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const board = await prisma.boards.update({
      where: { id },
      data: {
        name,
        work_schedule,
      },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const typedBoard = castToBoard(board);

    return NextResponse.json(typedBoard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Boards | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const canEdit = hasPermission(prisma, session, id, "edit", "DELETE");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const board = await prisma.boards.delete({
      where: { id },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const typedBoard = castToBoard(board);

    return NextResponse.json(typedBoard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
