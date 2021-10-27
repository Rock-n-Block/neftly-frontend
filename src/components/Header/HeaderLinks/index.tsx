import { FC, useMemo } from 'react';
import { routes } from 'appConstants';
import cx from 'classnames';
import { Link } from 'components';
import { useMst } from 'store';

import styles from './styles.module.scss';

type Props = {
  toggleMenu?: () => void;
  className?: string;
};

const HeaderLinks: FC<Props> = ({ className, toggleMenu }) => {
  const { user } = useMst();
  const nav = useMemo(
    () => [
      {
        url: routes.discover.root,
        title: 'Discover',
        disabled: false,
      },
      {
        url: routes.create.root,
        title: 'Create item',
        disabled: !user.address,
      },
    ],
    [user.address],
  );

  return (
    <div className={cx(styles.headerNavigation, className)}>
      {nav.map(({ url, title }) => {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <Link key={url} name={title} link={url} onClick={toggleMenu} />;
      })}
    </div>
  );
};

export default HeaderLinks;
