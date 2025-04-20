import { NextRequest, NextResponse } from "next/server";
import { getSession, Session } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Board, WorkSchedule } from "@/types";
import { castToBoard, castToBoards } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(): Promise<
  NextResponse<Board[] | { error: string }>
> {
  const session: Session | null = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const boards = await prisma.boards.findMany({
    where: {
      OR: [
        { user_id: session.user.id },
        { board_members: { some: { user_id: session.user.id } } },
      ],
    },
  });

  const typedBoards = castToBoards(boards);

  return NextResponse.json(typedBoards);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Board | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, work_schedule } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const board = await prisma.boards.create({
    data: {
      name,
      user_id: session.user.id,
      work_schedule: work_schedule ?? null,
    },
  });

  const typedBoard = castToBoard(board);

  return NextResponse.json(typedBoard, { status: 201 });
}
