import cn from 'classnames';

import styles from './Switch.module.scss';

interface ISwitchProps {
  className?: string;
  value: boolean;
  setValue: (foo: boolean) => void;
}

const Switch: React.FC<ISwitchProps> = ({ className, value, setValue }) => {
  return (
    <label htmlFor="toogle" className={cn(styles.switch, className)}>
      <input
        id="toogle"
        className={styles.input}
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
      <span className={styles.inner}>
        <span className={styles.box} />
      </span>
    </label>
  );
};

export default Switch;
