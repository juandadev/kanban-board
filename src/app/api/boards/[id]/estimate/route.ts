import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { EstimateResult, WorkSchedule } from "@/types/boards";
import { hasPermission } from "@/lib/services";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<EstimateResult | { error: string }>> {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const startDate = new Date(searchParams.get("startDate") || new Date());

  try {
    const board = await prisma.boards.findUnique({
      where: { id },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!board) {
      return NextResponse.json({ error: "Boards not found" }, { status: 404 });
    }

    const hasAccess = await hasPermission(prisma, session, id, "edit", "GET");

    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const totalHours = board.columns
      .flatMap((column) => column.tasks)
      .reduce(
        (sum, task) => sum + ((task.estimated_hours as unknown as number) || 0),
        0,
      );

    const schedule: WorkSchedule =
      (board.work_schedule as unknown as WorkSchedule) ?? {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };

    let remainingHours = totalHours;
    let currentDate = new Date(startDate);
    const dayHours = [
      schedule.sunday,
      schedule.monday,
      schedule.tuesday,
      schedule.wednesday,
      schedule.thursday,
      schedule.friday,
      schedule.saturday,
    ];

    while (remainingHours > 0) {
      const dayOfWeek = currentDate.getDay();
      const hoursToday = dayHours[dayOfWeek];

      if (hoursToday > 0) {
        remainingHours -= Math.min(hoursToday, remainingHours);
      }
      if (remainingHours > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    const msDiff = currentDate.getTime() - startDate.getTime();
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const weeks = Math.floor((days % 30) / 7);
    const remainingDays = days % 7;
    const hours = Math.round(
      (msDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const result: EstimateResult = {
      totalHours,
      startDate: startDate.toISOString(),
      endDate: currentDate.toISOString(),
      duration: {
        months,
        weeks,
        days: remainingDays,
        hours,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
