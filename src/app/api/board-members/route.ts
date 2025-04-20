import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { BoardMember, BoardMemberWithUser } from "@/types";
import { castToMember, castToMembers } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<BoardMemberWithUser[] | { error: string }>> {
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

  const members = await prisma.board_members.findMany({
    where: { board_id: boardId },
    include: { users: { select: { email: true, name: true } } },
  });
  const typedMembers = castToMembers(members);

  return NextResponse.json(typedMembers);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<BoardMember | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { board_id, user_id, role } = await request.json();

  if (
    !board_id ||
    !user_id ||
    !role ||
    !["read_only", "edit", "admin"].includes(role)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const board = await prisma.boards.findUnique({
    where: { id: board_id },
    include: { board_members: { where: { user_id: session.user.id } } },
  });

  if (
    !board ||
    (board.user_id !== session.user.id &&
      !board.board_members.some((m) => m.role === "admin"))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const member = await prisma.board_members.create({
    data: {
      board_id,
      user_id,
      role,
    },
  });
  const typedMember = castToMember(member);

  return NextResponse.json(typedMember, { status: 201 });
}
