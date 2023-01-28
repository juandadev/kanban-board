import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import DetailsPopUp from '../DetailsPopUp';
import s from './Main.module.scss';

const Main = ({ containerClassName, activeBoard }) => {
  const { name, columns } = activeBoard;
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState({});

  const handleDetailsModal = (task, columnNames, idxColumn, idxTask) => {
    const newTaskObject = { ...task, columnNames, idxColumn, idxTask };

    setIsDetailsModalOpen((state) => !state);
    setActiveTask(newTaskObject);
  };

  const renderTasks = (tasks, idxColumn) => {
    const subtaskList = tasks.map((task) => task.subtasks);
    const columnNames = columns.map((column) => column.name);
    const completedSubtasks = (index) =>
      subtaskList[index].filter((subtask) => subtask.isCompleted);

    return tasks.map((task, idxTask) => (
      <div
        key={`${task.title.trim().toLowerCase()}`}
        className={s.task}
        onClick={() => handleDetailsModal(task, columnNames, idxColumn, idxTask)}
        aria-hidden>
        <span className={s.taskTitle}>{task.title}</span>
        <span className={s.taskSubtitle}>{`${completedSubtasks(idxTask)?.length ?? '0'} of ${
          task.subtasks?.length ?? '0'
        } subtasks`}</span>
      </div>
    ));
  };

  const renderColumns = () =>
    columns.map((column, index) => (
      <div key={`${name.trim().toLowerCase()}-column-${column.name}`} className={s.column}>
        <div className={s.columnTitle}>
          <span className={s.title}>{`${column.name} (${column.tasks?.length ?? '0'})`}</span>
        </div>
        <div className={s.taskContainer}>{column.tasks && renderTasks(column.tasks, index)}</div>
      </div>
    ));

  return (
    <main className={`${s.container} ${containerClassName}`}>
      {Object.keys(activeBoard).length === 0 ? (
        <div className={s.emptyBoard}>
          <p className={s.text}>This board is empty. Create a new column to get started.</p>
          <Button type="primary" size="large">
            + Add New Column
          </Button>
        </div>
      ) : (
        <>{renderColumns()}</>
      )}
      <DetailsPopUp
        isModalOpen={isDetailsModalOpen}
        onModalClose={handleDetailsModal}
        task={activeTask}
      />
    </main>
  );
};

Main.propTypes = {
  containerClassName: PropTypes.string,
  activeBoard: PropTypes.shape()
};

Main.defaultProps = {
  containerClassName: null,
  activeBoard: null
};

export default memo(Main);
