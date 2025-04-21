export const REQUIRED_FIELD = "Can't be empty";

export const REQUEST_ERRORS = {
  INVALID_INPUT: "Invalid values",
  UNAUTHORIZED: "Invalid session, please try and log in again",
  FORBIDDEN: "The user does not have permission to perform this action",
  NOT_FOUND: "Resource not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

export const BOARD_REQUESTS = {
  GET_BOARDS_SUCCESS: "Boards retrieved successfully",
  GET_BOARD_SUCCESS: "Board retrieved successfully",
  POST_BOARDS_SUCCESS: "Board created successfully",
  PUT_BOARDS_SUCCESS: "Board updated successfully",
  DELETE_BOARDS_SUCCESS: "Board deleted successfully",
};

export const BOARD_MEMBERS_REQUESTS = {
  GET_MEMBERS_SUCCESS: "Members retrieved successfully",
  POST_MEMBERS_SUCCESS: "Member added to board successfully",
  DELETE_MEMBERS_SUCCESS: "Member removed from board successfully",
};
