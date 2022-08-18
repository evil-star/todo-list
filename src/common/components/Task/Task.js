import React from 'react';
import classNames from 'classnames';
import styles from './Task.module.sass';
import Switch from '../../ui/Switch/Switch';

const Task = ({
  onCompleteChange = () => {},
  onEdit = () => {},
  isCompleted = false,
  title,
  text,
  lineColor = '#A9A9A9',
}) => {
  return (
    <div
      className={classNames(styles.task, {
        [styles['task--completed']]: isCompleted,
      })}
    >
      <div
        className={styles.task__line}
        style={{ background: lineColor }}
      ></div>
      <div className={styles.task__main} onClick={onEdit}>
        {title && <div className={styles.task__title}>{title}</div>}
        {text && <div className={styles.task__text}>{text}</div>}
      </div>
      <div className={styles.task__switch}>
        <Switch isChecked={isCompleted} onChange={onCompleteChange} />
      </div>
    </div>
  );
};

export default Task;
