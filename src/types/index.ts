export type MemberRole = "read_only" | "edit" | "admin";
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
