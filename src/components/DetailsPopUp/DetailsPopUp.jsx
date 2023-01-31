import React, { useContext, useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import Subtask from '../Subtask/Subtask';
import types from '../../context/types';
import { boardsContext } from '../../context/boardContext';
import s from './DetailsPopUp.module.scss';

export default function DetailsPopUp({ isModalOpen, onModalClose, task = {} }) {
  const { dispatch } = useContext(boardsContext);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    setSubtasks(task.subtasks);
  }, [task]);

  const optionsObject = () =>
    task.columnNames?.map((name) => ({ label: name, value: name.toLowerCase() })) || [];

  const handleSubtaskChange = (event) => {
    const { title } = event.target.dataset;

    setSubtasks((state) =>
      state.map((item) =>
        item.title === title ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );

    dispatch({
      type: types.TOGGLE_SUBTASK,
      idxColumn: task.idxColumn,
      idxTask: task.idxTask,
      subtaskTitle: title
    });
  };

  const handleColumnChange = (event, input) => {
    dispatch({
      type: types.CHANGE_TASK_COLUMN,
      task,
      idxColumn: task.idxColumn,
      idxTargetColumn: task.columnNames.indexOf(input.label),
      columnName: task.status,
      newColumnName: input.label
    });
  };

  const renderSubTasks = () =>
    subtasks?.map((subtask, id) => (
      <Subtask
        key={`subtask-${subtask.title}`}
        id={id}
        data-title={subtask.title}
        defaultChecked={subtask.isCompleted}
        onChange={handleSubtaskChange}>
        {subtask.title}
      </Subtask>
    ));

  const completedSubtasks = () => {
    const completed = subtasks?.filter((subtask) => subtask.isCompleted) || [];

    return completed.length;
  };

  return (
    <Modal isModalOpen={isModalOpen} onModalClose={onModalClose} className={s.modal}>
      <div className={s.modalInfo}>
        <span className={s.modalTitle}>
          <span className={s.modalTitleText}>{task.title}</span>
          <Icon icon="vertical-ellipsis" className={s.modalTitleIcon} />
        </span>
        {task.description && <span className={s.modalDescription}>{task.description}</span>}
      </div>
      <div className={s.modalSubtasks}>
        <span className={s.modalLabel}>
          Subtasks ({`${completedSubtasks()} of ${subtasks?.length || 0}`})
        </span>
        <div className={s.subtaskContainer}>{renderSubTasks()}</div>
      </div>
      <div className={s.modalStatus}>
        <Dropdown
          label="Current Status"
          options={optionsObject()}
          defaultOption={task.status}
          onChange={handleColumnChange}
        />
      </div>
    </Modal>
  );
}
