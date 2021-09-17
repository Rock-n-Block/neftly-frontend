import React from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Icon from '../Icon';

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
        <Link className={cn('button-stroke button-small', styles.button)} to="/">
          <Icon name="arrow-prev" size="10" />
          <span>Back to home</span>
        </Link>
        <div className={styles.breadcrumbs}>
          {item.map((x) => (
            <div className={styles.item} key={nextId()}>
              {x.url ? (
                <Link className={styles.link} to={x.url}>
                  {x.title}
                </Link>
              ) : (
                x.title
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
