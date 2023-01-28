import React, { createContext, useReducer } from 'react';

const initialState = {
  boards: [],
  activeBoard: 1
};
const boardsContext = createContext(initialState);
const { Provider } = boardsContext;

function BoardsProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'INITIALIZE_BOARDS':
        return {
          ...reducerState,
          boards: action.boards
        };

      case 'SELECT_BOARD':
        return {
          ...reducerState,
          activeBoard: action.activeBoard
        };

      case 'TOGGLE_SUBTASK': {
        const { boards, activeBoard } = reducerState;
        const { idxColumn, idxTask, title } = action;
        const getBoard = boards.find((board) => board.id === activeBoard);
        const getColumns = getBoard.columns;
        const getTargetColumn = getBoard.columns[idxColumn];
        const getTasks = getTargetColumn.tasks;
        const getTargetTask = getTargetColumn.tasks[idxTask];
        const getTargetSubtasks = getTargetTask.subtasks;
        const newTargetSubtasks = getTargetSubtasks.map((subtask) =>
          subtask.title === title
            ? { title: subtask.title, isCompleted: !subtask.isCompleted }
            : subtask
        );
        const newBoards = boards.map((board) =>
          board.id === activeBoard
            ? {
                ...getBoard,
                columns: [
                  ...getColumns.map((column, indexCol) =>
                    indexCol === idxColumn
                      ? {
                          ...column,
                          tasks: [
                            ...getTasks.map((task, indexTask) =>
                              indexTask === idxTask
                                ? {
                                    ...task,
                                    subtasks: [...newTargetSubtasks]
                                  }
                                : task
                            )
                          ]
                        }
                      : column
                  )
                ]
              }
            : board
        );

        return {
          ...reducerState,
          boards: newBoards
        };
      }

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { boardsContext, BoardsProvider };
