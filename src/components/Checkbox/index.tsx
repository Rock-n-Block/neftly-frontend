import cn from 'classnames';

import styles from './Checkbox.module.scss';
import { FC } from 'react';

interface ICheckboxProps {
  className?: string;
  content: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox: FC<ICheckboxProps> = ({ className, content, value, onChange }) => {
  return (
    <label htmlFor={`toogle_${content}`} className={cn(styles.checkbox, className)}>
      <input
        id={`toogle_${content}`}
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        checked={value}
      />
      <span className={styles.inner}>
        <span className={styles.tick} />
        <span className={styles.text}>{content}</span>
      </span>
    </label>
  );
};

export default Checkbox;
