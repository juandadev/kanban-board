import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { User } from "@/types";

export interface Session {
  user: Pick<User, "id" | "email" | "name">;
}

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}
