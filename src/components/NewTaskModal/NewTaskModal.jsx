import React from 'react';
import Modal from '../Modal/Modal';
// import s from './NewTaskModal.module.scss';

export default function NewTaskModal({ ...passThroughProps }) {
  return <Modal {...passThroughProps}>Create new task</Modal>;
}
