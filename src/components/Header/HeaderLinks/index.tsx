/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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
        url: routes.create.root,
        title: 'Create item',
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
              color="transparent"
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={handleMouseLeave}
              className={styles.internalLinkWrapperBtn}
            >
              <Text color="secondary">{title}</Text>
              <div
                className={cx(styles.internalLinksWrapper, {
                  [styles.isOpen]: openedMenuIndex === index,
                })}
              >
                {internalLinks?.map(({ label, value }) => {
                  return (
                    <Link style={{ width: '100%' }} to={routes.discover.link(value)}>
                      <Button isFullWidth>{label}</Button>
                    </Link>
                  );
                })}
              </div>
            </Button>
          );
        }
        return 123;
      })}
    </div>
  );
};

export default HeaderLinks;
