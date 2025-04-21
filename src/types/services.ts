import {
  ActiveBoard,
  Board,
  BoardMember,
  BoardMemberWithUser,
} from "@/types/board";

export interface RequestError {
  error: string;
}

export interface GenericResponse<T> {
  message: string;
  payload: T;
}

export interface GenericErrorResponse extends GenericResponse<{}> {}

export interface GetBoardResponse
  extends GenericResponse<{ board: ActiveBoard }> {}

export interface PostBoardResponse extends GenericResponse<{ board: Board }> {}

export interface PatchBoardResponse extends GenericResponse<{ board: Board }> {}

export interface DeleteBoardResponse
  extends GenericResponse<{ board: Board }> {}

export interface GetBoardsResponse
  extends GenericResponse<{ boards: Board[] }> {}

export interface GetBoardsByIdResponse
  extends GenericResponse<{ board: ActiveBoard }> {}

export interface GetBoardMembersResponse
  extends GenericResponse<{ members: BoardMemberWithUser[] }> {}

export interface PostBoardMembersResponse
  extends GenericResponse<{ member: BoardMember }> {}

export interface DeleteBoardMembersResponse
  extends GenericResponse<{ member: BoardMember }> {}
