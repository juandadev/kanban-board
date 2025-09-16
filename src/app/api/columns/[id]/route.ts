import { NextRequest, NextResponse } from "next/server";
import { Column } from "@/types/board";
import { RequestError } from "@/types/services";
import { getSession } from "@/lib/auth";
import { hasPermission } from "@/lib/services";
import { castToColumn } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Column | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { name } = await request.json();

  if (!id || !name) {
    return NextResponse.json(
      { error: "ID and name are required" },
      { status: 400 },
    );
  }

  const column = await prisma.columns.findUnique({
    where: { id },
  });

  if (!column) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }

  const canEdit = hasPermission(
    prisma,
    session,
    column.board_id,
    "edit",
    "PATCH",
  );

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updatedColumn = await prisma.columns.update({
    where: { id },
    data: { name },
  });

  const typedColumn = castToColumn(updatedColumn);

  return NextResponse.json(typedColumn);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<Column | RequestError>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const column = await prisma.columns.findUnique({
    where: { id },
  });

  if (!column) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }

  const canEdit = hasPermission(
    prisma,
    session,
    column.board_id,
    "edit",
    "DELETE",
  );

  if (!canEdit) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedColumn = await prisma.columns.delete({
    where: { id },
  });
  const typedColumn = castToColumn(deletedColumn);

  return NextResponse.json(typedColumn);
}
