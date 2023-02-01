import React, { createContext, useReducer } from 'react';

const initialState = {
  board: '',
  columns: [],
  tasks: [],
  subtasks: [],
  boardNames: [],
  activeBoardIdx: 0
};
const boardsContext = createContext(initialState);
const { Provider } = boardsContext;

function BoardsProvider({ children }) {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'INITIALIZE_BOARD': {
        const columns = action.board.columns.map((column) => column.name);
        const tasks = action.board.columns.reduce(
          (accumulator, current) => accumulator.concat(current.tasks),
          []
        );

        return {
          ...reducerState,
          board: action.board.name,
          columns,
          tasks
        };
      }

      case 'SET_BOARD_NAMES':
        return {
          ...reducerState,
          boardNames: action.boardNames
        };

      case 'SELECT_BOARD':
        return {
          ...reducerState,
          activeBoardIdx: action.activeBoard
        };

      case 'TOGGLE_SUBTASK': {
        const { tasks } = reducerState;
        const { taskTitle, subtaskTitle } = action;
        const targetTask = tasks.filter((task) => task.title === taskTitle)[0];
        const newSubtasks = targetTask.subtasks.map((subtask) =>
          subtask.title === subtaskTitle
            ? { ...subtask, isCompleted: !subtask.isCompleted }
            : subtask
        );
        const newTasks = tasks.map((task) =>
          task.title === targetTask.title ? { ...task, subtasks: newSubtasks } : task
        );

        return { ...reducerState, tasks: newTasks };
      }

      case 'CHANGE_TASK_COLUMN':
        return null;

      default:
        return reducerState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { boardsContext, BoardsProvider };
