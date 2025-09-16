import { NextRequest, NextResponse } from "next/server";
import { Invitation } from "@/types/board";
import { RequestError } from "@/types/services";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { hasPermission } from "@/lib/services";
import { castToInvitation } from "@/lib/utils";

const prisma = new PrismaClient();

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
): Promise<NextResponse<Invitation | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const invitation = await prisma.invitations.findUnique({
    where: { id },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Invitation not found" },
      { status: 404 },
    );
  }

  const canEdit = hasPermission(
    prisma,
    session,
    invitation.board_id,
    "admin",
    "DELETE",
  );

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedInvitation = await prisma.invitations.delete({
    where: { id },
  });
  const typedInvitation = castToInvitation(deletedInvitation);

  return NextResponse.json(typedInvitation);
}
