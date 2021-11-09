import { FC, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { marketplaceLinks, routes } from 'appConstants';
import cx from 'classnames';
import { Button, Text } from 'components';
import { debounce } from 'lodash';
import { useMst } from 'store';
import { TNullable } from 'typings';

import styles from './styles.module.scss';

type Props = {
  toggleMenu?: () => void;
  className?: string;
};

const HeaderLinks: FC<Props> = ({ className, toggleMenu }) => {
  const { user } = useMst();

  const location = useLocation();

  const nav = useMemo(
    () => [
      {
        title: 'Explore',
        disabled: false,
        isNested: true,
        internalLinks: marketplaceLinks,
      },
      {
        url: routes.activity.root,
        title: 'Activity',
        isNested: false,
        disabled: !user.address,
      },
      {
        url: routes.create.root,
        title: 'Create',
        isNested: false,
        disabled: !user.address,
      },
    ],
    [user.address],
  );

  const [openedMenuIndex, setOpenedMenuIndex] = useState<TNullable<number>>(null);

  const handleMouseOver = debounce((index) => setOpenedMenuIndex(index), 150);
  const handleMouseLeave = () => setOpenedMenuIndex(null);

  useEffect(() => {
    setOpenedMenuIndex(null);
  }, [location.pathname]);

  return (
    <div className={cx(styles.headerNavigation, className)}>
      {nav.map(({ url, title, disabled, isNested, internalLinks }, index) => {
        if (isNested) {
          return (
            <Button
              key={title}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              onClick={toggleMenu}
              className={styles.internalLinkWrapperBtn}
              disabled={disabled}
              color="transparent"
            >
              <Text>{title}</Text>
              <div
                className={cx(styles.internalLinksWrapper, {
                  [styles.isOpen]: openedMenuIndex === index,
                })}
              >
                {internalLinks?.map(({ label, value }) => {
                  return (
                    <Link style={{ width: '100%' }} to={routes.discover.filter(value)} key={label}>
                      <Button isFullWidth>{label}</Button>
                    </Link>
                  );
                })}
              </div>
            </Button>
          );
        }
        if (url) {
          return (
            <Link to={url} key={title}>
              <Button color="transparent" onClick={toggleMenu}>
                <Text>{title}</Text>
              </Button>
            </Link>
          );
        }
        return (
          <Button key={title} color="transparent" onClick={toggleMenu}>
            <Text>{title}</Text>
          </Button>
        );
      })}
    </div>
  );
};

export default HeaderLinks;
