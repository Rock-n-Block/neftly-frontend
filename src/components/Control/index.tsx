/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cn from 'classnames';
import { Link, Text } from 'components';

import styles from './Control.module.scss';

// TODO: fix any
interface IControlProps {
  className?: string;
  item: Array<{ title: string; url?: string }>;
}

const Control: React.FC<IControlProps> = ({ className, item }) => {
  return (
    <div className={cn(styles.control, className)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.breadcrumbs}>
          {item.map((x, index) => (
            <div className={styles.item} key={index}>
              {x.url ? (
                <Link color="lightGray" name={x.title} className={styles.link} link={x.url} />
              ) : (
                <Text size="m" weight="medium" color="primary">
                  {x.title}
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Control.defaultProps = {
  className: '',
};

export default Control;
