import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'components';

import styles from './styles.module.scss';
import { routes } from 'appConstants';

const nav = [
  {
    url: routes.discover.root,
    title: 'Discover',
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
