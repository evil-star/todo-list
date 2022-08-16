import React from 'react';
import styles from './Switch.module.sass';
import classNames from 'classnames';
import { ReactComponent as TickSvg } from '../../../assets/images/icons/tick.svg';
import { ReactComponent as CrossSvg } from '../../../assets/images/icons/cross.svg';

const Switch = ({ onChange = () => {}, isChecked = false }) => {
  return (
    <div
      className={classNames(styles.switch, {
        [styles['switch--checked']]: isChecked,
      })}
      onClick={() => onChange(!isChecked)}
    >
      <div className={styles.switch__handler}>
        {isChecked ? <TickSvg /> : <CrossSvg />}
      </div>
    </div>
  );
};

export default Switch;
