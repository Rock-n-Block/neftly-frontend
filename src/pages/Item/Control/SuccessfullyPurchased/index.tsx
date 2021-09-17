import nextId from 'react-id-generator';
import cn from 'classnames';

import Icon from '../../../../components/Icon';

import styles from './SuccessfullyPurchased.module.scss';

const socials: Array<{ title: 'facebook' | 'twitter' | 'instagram' | 'pinterest'; url: string }> = [
  {
    title: 'facebook',
    url: 'https://www.facebook.com/ui8.net/',
  },
  {
    title: 'twitter',
    url: 'https://twitter.com/ui8',
  },
  {
    title: 'instagram',
    url: 'https://www.instagram.com/ui8net/',
  },
  {
    title: 'pinterest',
    url: 'https://www.pinterest.com/ui8m/',
  },
];
interface ISuccessfullyPurchasedProps {
  className?: string;
}

const SuccessfullyPurchased: React.FC<ISuccessfullyPurchasedProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={cn('h2', styles.title)}>
        Yay!{' '}
        <span role="img" aria-label="firework">
          🎉
        </span>
      </div>
      <div className={styles.info}>
        You successfully purchased <span>C O I N Z</span> from UI8
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>Status</div>
          <div className={styles.col}>Transaction ID</div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>Processing</div>
          <div className={styles.col}>0msx836930...87r398</div>
        </div>
      </div>
      <div className={styles.stage}>Time to show-off</div>
      <div className={styles.socials}>
        {socials.map((x) => (
          <a
            className={styles.social}
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            key={nextId()}
          >
            <Icon name={x.title} size="24" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuccessfullyPurchased;
