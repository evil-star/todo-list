import classNames from 'classnames';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import styles from './TasksGroup.module.sass';
import { ReactComponent as ArrowSvg } from '../../../assets/images/icons/arrow-down-circle.svg';

const TasksGroup = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState();

  return (
    <div
      className={classNames(styles.tasks_group, {
        [styles['tasks_group--opened']]: isOpened || !title,
        [styles['tasks_group--no_head']]: !title,
      })}
    >
      <AnimateHeight height={title ? 'auto' : 0}>
        <div
          className={styles.tasks_group__head}
          onClick={() => setIsOpened(!isOpened)}
        >
          <span>{title}</span>{' '}
          <ArrowSvg className={styles.tasks_group__arrow} />
        </div>
      </AnimateHeight>

      <AnimateHeight height={isOpened || !title ? 'auto' : 0}>
        <div className={styles.tasks_group__main}>{children}</div>
      </AnimateHeight>
    </div>
  );
};

export default TasksGroup;
