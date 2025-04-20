import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Invitation } from "@/types/boards";
import { castToInvitation } from "@/lib/utils";
import { RequestError } from "@/types/services";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Invitation | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { board_id, email, role } = await request.json();

  if (
    !board_id ||
    !email ||
    !role ||
    !["read_only", "edit", "admin"].includes(role)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const canEdit = hasPermission(prisma, session, board_id, "admin", "POST");

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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

  const token = uuidv4();
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const invitation = await prisma.invitations.create({
    data: {
      board_id,
      inviter_id: session.user.id,
      email,
      token,
      status: "pending",
      role,
      expires_at,
    },
  });
  const typedInvitation = castToInvitation(invitation);

  // TODO: code to send email with token (e.g., using SendGrid or Supabase email)
  return NextResponse.json(typedInvitation, { status: 201 });
}
