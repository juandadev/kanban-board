import { Dispatch } from "react";

export type MemberRole = "read_only" | "edit" | "admin";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type InvitationStatus = "pending" | "accepted" | "expired";

export interface WorkSchedule {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  password_hash: string | null;
  provider: string | null;
  provider_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ActiveBoard {
  id: string;
  name: string;
  user_id: string;
  work_schedule: WorkSchedule | null;
  columns: (Column & {
    tasks: (Task & {
      subtasks: Subtask[];
    })[];
  })[];
  board_members: BoardMember[];
  invitations: Invitation[];
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Board {
  id: string;
  name: string;
  user_id: string;
  work_schedule: WorkSchedule | null;
  created_at: Date;
  updated_at: Date;
}

export interface Column {
  id: string;
  name: string;
  board_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  column_id: string;
  estimated_hours: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface Subtask {
  id: string;
  title: string;
  is_completed: boolean;
  task_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface BoardMember {
  id: string;
  board_id: string;
  user_id: string;
  role: MemberRole;
  created_at: Date;
  updated_at: Date;
}

export interface BoardMemberWithUser extends BoardMember {
  users: Pick<User, "email" | "name">;
}

export interface Invitation {
  id: string;
  board_id: string;
  inviter_id: string;
  email: string;
  token: string;
  status: InvitationStatus;
  role: MemberRole;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface EstimateResult {
  totalHours: number;
  startDate: string;
  endDate: string;
  duration: {
    months: number;
    weeks: number;
    days: number;
    hours: number;
  };
}

export interface CreateNewBoardPayload extends Board {
  columns: Column[];
}

export interface BoardsContextType {
  state: BoardsState;
  dispatch: Dispatch<BoardsActions>;
}

export type BoardsState = {
  boards: Board[];
  activeBoardId: string;
  activeBoard: ActiveBoard;
};

export type BoardsActions =
  | {
      type: "INITIALIZE_BOARDS";
      payload: {
        boards: Board[];
      };
    }
  | {
      type: "CREATE_BOARD";
      payload: {
        name: string;
      };
    }
  | {
      type: "UPDATE_COLUMNS";
      payload: {
        boardId: string;
        columns: NewBoardColumn[];
      };
    };

export interface NewBoardColumn {
  id: string;
  name: string;
}
