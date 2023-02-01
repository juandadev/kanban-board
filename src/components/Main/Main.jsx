import React, { memo, useCallback, useContext, useState } from 'react';
import DetailsPopUp from '../DetailsPopUp';
import { boardsContext } from '../../context/boardContext';
import s from './Main.module.scss';
import Button from '../Button/Button';

const Main = ({ containerClassName = '', isLoading = true }) => {
  if (!isLoading) {
    const { state: boardsState } = useContext(boardsContext);
    const { board, columns, tasks } = boardsState;
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [activeTask, setActiveTask] = useState({});

    const handleDetailsModal = (task, columnNames, idxColumn, idxTask) => {
      const newTaskObject = { ...task, columnNames, idxColumn, idxTask };

      setIsDetailsModalOpen((state) => !state);
      setActiveTask(newTaskObject);
    };

    const renderTasks = (idxColumn) => {
      const filteredTasks = tasks.filter((task) => task.status === columns[idxColumn]);

      return filteredTasks.map((task, idxTask) => {
        const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted);

        return (
          <div
            key={`${task.title.trim().toLowerCase()}`}
            className={s.task}
            onClick={() => handleDetailsModal(task, columns, idxColumn, idxTask)}
            aria-hidden>
            <span className={s.taskTitle}>{task.title}</span>
            <span className={s.taskSubtitle}>{`${completedSubtasks.length ?? '0'} of ${
              task.subtasks?.length ?? '0'
            } subtasks`}</span>
          </div>
        );
      });
    };

    const renderColumns = useCallback(
      () =>
        columns.map((column, index) => {
          const getColumnTasks = tasks.filter((task) => task.status === column);

          return (
            <div key={`${board.trim().toLowerCase()}-column-${column}`} className={s.column}>
              <div className={s.columnTitle}>
                <span className={s.title}>{`${column} (${getColumnTasks.length ?? '0'})`}</span>
              </div>
              <div className={s.taskContainer}>{tasks && renderTasks(index)}</div>
            </div>
          );
        }),
      [tasks]
    );

    return (
      <main className={`${s.container} ${containerClassName}`}>
        {renderColumns()}
        <DetailsPopUp
          isModalOpen={isDetailsModalOpen}
          onModalClose={handleDetailsModal}
          task={activeTask}
        />
      </main>
    );
  }

  return (
    <div className={s.emptyBoard}>
      <p className={s.text}>This board is empty. Create a new column to get started.</p>
      <Button type="primary" size="large">
        + Add New Column
      </Button>
    </div>
  );
};

export default memo(Main);
