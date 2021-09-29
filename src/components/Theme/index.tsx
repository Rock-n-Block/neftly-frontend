import cn from 'classnames';
import useDarkMode from 'use-dark-mode';

import styles from './Theme.module.scss';

interface IThemeProps {
  className?: string;
}

const Theme: React.FC<IThemeProps> = ({ className }) => {
  const darkMode = useDarkMode(false);

  return (
    <label
      htmlFor="darkMode"
      className={cn(
        styles.theme,
        { [styles.theme]: className === 'theme' },
        { [styles.themeBig]: className === 'theme-big' },
      )}
    >
      <input
        id="darkMode"
        className={styles.input}
        checked={darkMode.value}
        onChange={darkMode.toggle}
        type="checkbox"
      />
      <span className={styles.inner}>
        <span className={styles.box} />
      </span>
    </label>
  );
};

export default Theme;
