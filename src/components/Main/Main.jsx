import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import s from './Main.module.scss';
import DetailsPopUp from '../DetailsPopUp/DetailsPopUp';

const Main = ({ containerClassName, activeBoard }) => {
  const { name, columns } = activeBoard;

  const renderTasks = (tasks) => {
    const subtaskList = tasks.map((task) => task.subtasks);
    const completedSubtasks = (index) =>
      subtaskList[index].filter((subtask) => subtask.isCompleted);

    return tasks.map((task, index) => (
      <div key={`${task.title.trim().toLowerCase()}`} className={s.task}>
        <span className={s.taskTitle}>{task.title}</span>
        <span className={s.taskSubtitle}>{`${completedSubtasks(index)?.length ?? '0'} of ${
          task.subtasks?.length ?? '0'
        } subtasks`}</span>
      </div>
    ));
  };

  const renderColumns = () =>
    columns.map((column) => (
      <div key={`${name.trim().toLowerCase()}-column-${column.name}`} className={s.column}>
        <div className={s.columnTitle}>
          <span className={s.title}>{`${column.name} (${column.tasks?.length ?? '0'})`}</span>
        </div>
        <div className={s.taskContainer}>{column.tasks && renderTasks(column.tasks)}</div>
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
      <DetailsPopUp />
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
