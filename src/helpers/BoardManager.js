class BoardManager {
  constructor(state, action) {
    const { boards, activeBoard } = state;
    const { idxColumn, idxTask, subtaskTitle = '' } = action;

    this.boards = boards;
    this.activeBoard = activeBoard;
    this.idxColumn = idxColumn;
    this.idxTask = idxTask;
    this.subtaskTitle = subtaskTitle;

    this.getBoard = this.getBoard.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.getTargetColumn = this.getTargetColumn.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.getTargetTask = this.getTargetTask.bind(this);
    this.getSubtasks = this.getSubtasks.bind(this);
    this.editBoard = this.editBoard.bind(this);
  }

  getBoard() {
    return this.boards.find((board) => board.id === this.activeBoard);
  }

  getColumns() {
    return this.getBoard().columns;
  }

  getTargetColumn() {
    return this.getColumns()[this.idxColumn];
  }

  getTasks() {
    return this.getTargetColumn().tasks;
  }

  getTargetTask() {
    return this.getTasks()[this.idxTask];
  }

  getSubtasks() {
    return this.getTargetTask().subtasks;
  }

  editBoard(level) {
    let newSubtasks;

    switch (level) {
      case 'subtask':
        newSubtasks = this.getSubtasks().map((subtask) =>
          subtask.title === this.subtaskTitle
            ? { ...subtask, isCompleted: !subtask.isCompleted }
            : subtask
        );
        break;

      default:
        break;
    }

    return this.boards.map((board) =>
      board.id === this.activeBoard
        ? {
            ...this.getBoard(),
            columns: [
              ...this.getColumns().map((column, indexCol) =>
                indexCol === this.idxColumn
                  ? {
                      ...column,
                      tasks: [
                        ...this.getTasks().map((task, indexTask) =>
                          indexTask === this.idxTask
                            ? {
                                ...task,
                                subtasks:
                                  level === 'subtask' ? [...newSubtasks] : [...this.getSubtasks()]
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
  }
}

export default BoardManager;
