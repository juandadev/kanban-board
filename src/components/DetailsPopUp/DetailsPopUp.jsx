import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Icon from '../Icon/Icon';
import Subtask from '../Subtask/Subtask';
import s from './DetailsPopUp.module.scss';

export default function DetailsPopUp() {
  return (
    <>
      <div className={s.modal}>
        <div className={s.modalInfo}>
          <span className={s.modalTitle}>
            <span className={s.modalTitleText}>
              Research pricing points of various competitors and trial different business models
            </span>
            <Icon icon="vertical-ellipsis" className={s.modalTitleIcon} />
          </span>
          <span className={s.modalDescription}>
            We know what we&apos;re planning to build for version one. Now we need to finalise the
            first pricing model we&apos;ll use. Keep iterating the subtasks until we have a coherent
            proposition.
          </span>
        </div>
        <div className={s.modalSubtasks}>
          <span className={s.modalLabel}>Subtasks (2 of 3)</span>
          <div className={s.subtaskContainer}>
            <Subtask id={1}>Research competitor pricing and business models</Subtask>
            <Subtask id={2}>Outline a business model that works for our solution</Subtask>
            <Subtask id={3}>Surveying and testing</Subtask>
          </div>
        </div>
        <div className={s.modalStatus}>
          <Dropdown
            label="Current Status"
            options={[
              { label: 'Todo', value: 'todo' },
              { label: 'Doing', value: 'doing' },
              { label: 'Done', value: 'done' }
            ]}
          />
        </div>
      </div>
      <div className={s.overlay} />
    </>
  );
}
