import cn from 'classnames';

import { ReactComponent as Check } from '../../../assets/img/icons/check-gradient.svg';

import styles from './SuccessCreated.module.scss';

interface ISuccessCreated {
  close: () => void;
  title: string;
}

const SuccessCreated: React.FC<ISuccessCreated> = ({ title, close }) => {
  return (
    <div className={styles.success}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <Check />
        </div>
      </div>
      <div className={cn('h4', styles.title)}>Congrats you create your {title}!</div>
      <button className={cn('button', styles.button)} type="button" onClick={() => close()}>
        OK
      </button>
    </div>
  );
};

export default SuccessCreated;
