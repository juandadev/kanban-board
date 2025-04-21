import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession, Session } from "@/lib/auth";
import {
  DeleteBoardResponse,
  GenericErrorResponse,
  GetBoardResponse,
  PatchBoardResponse,
} from "@/types/services";
import { castToBoard } from "@/lib/utils";
import { hasPermission } from "@/lib/services";
import { BOARD_REQUESTS, REQUEST_ERRORS } from "@/lib/validation-texts";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<GetBoardResponse | GenericErrorResponse>> {
  const session: Session | null = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.UNAUTHORIZED, payload: {} },
      { status: 401 },
    );
  }

  const { id } = await params;
  const canView = hasPermission(prisma, session, id, "read_only", "GET");

  if (!canView) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.FORBIDDEN, payload: {} },
      { status: 403 },
    );
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
      return NextResponse.json(
        { message: REQUEST_ERRORS.NOT_FOUND, payload: {} },
        { status: 404 },
      );
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
      return NextResponse.json(
        { message: REQUEST_ERRORS.UNAUTHORIZED, payload: {} },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: BOARD_REQUESTS.GET_BOARD_SUCCESS,
      payload: { board },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: REQUEST_ERRORS.INTERNAL_SERVER_ERROR, payload: {} },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<PatchBoardResponse | GenericErrorResponse>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.UNAUTHORIZED, payload: {} },
      { status: 401 },
    );
  }

  const { id } = await params;
  const { name, work_schedule } = await request.json();
  const canEdit = hasPermission(prisma, session, id, "edit", "PATCH");

  if (!canEdit) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.FORBIDDEN, payload: {} },
      { status: 403 },
    );
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
      return NextResponse.json(
        { message: REQUEST_ERRORS.NOT_FOUND, payload: {} },
        { status: 404 },
      );
    }

    const typedBoard = castToBoard(board);

    return NextResponse.json({
      message: BOARD_REQUESTS.PUT_BOARDS_SUCCESS,
      payload: { board: typedBoard },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: REQUEST_ERRORS.INTERNAL_SERVER_ERROR, payload: {} },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<DeleteBoardResponse | GenericErrorResponse>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.UNAUTHORIZED, payload: {} },
      { status: 401 },
    );
  }

  const { id } = await params;
  const canEdit = hasPermission(prisma, session, id, "edit", "DELETE");

  if (!canEdit) {
    return NextResponse.json(
      { message: REQUEST_ERRORS.FORBIDDEN, payload: {} },
      { status: 403 },
    );
  }

  try {
    const board = await prisma.boards.delete({
      where: { id },
    });

    if (!board) {
      return NextResponse.json(
        { message: REQUEST_ERRORS.NOT_FOUND, payload: {} },
        { status: 404 },
      );
    }

    const typedBoard = castToBoard(board);

    return NextResponse.json({
      message: BOARD_REQUESTS.DELETE_BOARDS_SUCCESS,
      payload: { board: typedBoard },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: REQUEST_ERRORS.INTERNAL_SERVER_ERROR, payload: {} },
      { status: 500 },
    );
  }
}
