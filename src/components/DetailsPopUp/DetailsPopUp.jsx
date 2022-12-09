import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import Subtask from '../Subtask/Subtask';
import s from './DetailsPopUp.module.scss';

export default function DetailsPopUp({ isModalOpen, onModalClose, task = {} }) {
  if (Object.keys(task).length !== 0) {
    const optionsObject = () =>
      task.columnNames?.map((name) => ({ label: name, value: name.toLowerCase() })) || [];

    const renderSubTasks = () =>
      task.subtasks?.map((subtask, id) => (
        <Subtask key={`subtask-${subtask.title}`} id={id} defaultChecked={subtask.isCompleted}>
          {subtask.title}
        </Subtask>
      ));

    const completedSubtasks = () => {
      const completed = task.subtasks?.filter((subtask) => subtask.isCompleted) || [];

      return completed?.length || 0;
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
            Subtasks ({`${completedSubtasks()} of ${task.subtasks?.length || 0}`})
          </span>
          <div className={s.subtaskContainer}>{renderSubTasks()}</div>
        </div>
        <div className={s.modalStatus}>
          <Dropdown label="Current Status" options={optionsObject()} defaultOption={task.status} />
        </div>
      </Modal>
    );
  }

  return null;
}

DetailsPopUp.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        isCompleted: PropTypes.bool
      })
    )
  })
};
