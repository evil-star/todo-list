import React from 'react';
import styles from './RunningLine.module.sass';

const RunningLine = ({ children }) => {
  return (
    <div className={styles.line}>
      <div className={styles.line__half}>{children}</div>
      <div className={styles.line__half}>{children}</div>
    </div>
  );
};

export default RunningLine;
