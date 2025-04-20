import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { BoardMember, BoardMemberWithUser } from "@/types/boards";
import { castToMember, castToMembers } from "@/lib/utils";
import { RequestError } from "@/types/services";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<BoardMemberWithUser[] | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: board_id } = await params;

  const canView = hasPermission(prisma, session, board_id, "read_only", "GET");

  if (!canView) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const members = await prisma.board_members.findMany({
    where: { board_id },
    include: { users: { select: { email: true, name: true } } },
  });
  const typedMembers = castToMembers(members);

  return NextResponse.json(typedMembers);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<BoardMember | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: board_id } = await params;
  const { user_id, role } = await request.json();

  const canEdit = hasPermission(prisma, session, board_id, "edit", "POST");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!user_id || !role || !["read_only", "edit", "admin"].includes(role)) {
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
