import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'components';

import styles from './styles.module.scss';

const nav = [
  {
    url: '/discover',
    title: 'Discover',
  },
  {
    url: '/faq',
    title: 'How it work',
  },
];

type Props = {
  toggleMenu?: () => void;
  className?: string;
};

const HeaderLinks: FC<Props> = ({ className, toggleMenu }) => (
  <div className={cx(styles.headerNavigation, className)}>
    {nav.map(({ url, title }) => {
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      return <Link key={url} name={title} link={url} onClick={toggleMenu} />;
    })}
  </div>
);

export default HeaderLinks;
