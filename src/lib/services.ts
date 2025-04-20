import { PrismaClient } from "@prisma/client";
import { Session } from "@/lib/auth";
import { HttpMethod, MemberRole } from "@/types/boards";

const permissionRules: Record<
  Exclude<MemberRole, "admin">,
  { methods: HttpMethod[] }
> = {
  edit: {
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
  read_only: {
    methods: ["GET"],
  },
};

export async function hasPermission(
  prisma: PrismaClient,
  session: Session,
  boardId: string,
  role: MemberRole,
  method: HttpMethod,
): Promise<boolean> {
  if (!session || !session.user?.id) {
    return false;
  }

  const board = await prisma.boards.findUnique({
    where: { id: boardId },
    include: { board_members: { where: { user_id: session.user.id } } },
  });
  const isOwner = board?.user_id === session.user.id;
  const memberRole = board?.board_members[0]?.role;

  if (!board || (!isOwner && !memberRole)) {
    return false;
  }

  if (isOwner || memberRole === "admin") {
    return true;
  }

  const rules: { methods: HttpMethod[] } =
    // @ts-expect-error if role is admin it will return early
    permissionRules[role];

  return rules.methods.includes(method);
}
