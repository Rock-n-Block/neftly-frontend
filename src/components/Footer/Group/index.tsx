import { useState } from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Icon from '../../Icon';

import styles from './Group.module.scss';

// TODO: fix any
interface IGroupProps {
  className?: string;
  item: any;
}

const Group: React.FC<IGroupProps> = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.group, { [styles.active]: visible })}>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => {}}
        className={styles.head}
        onClick={() => setVisible(!visible)}
      >
        {item.title}
        <Icon name="arrow-bottom" size="10" />
      </div>
      <div className={styles.menu}>
        {/* TODO: fix any */}
        {item.menu.map((x: any) => {
          return x.url.startsWith('http') ? (
            <a
              className={styles.link}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={nextId()}
            >
              {x.title}
            </a>
          ) : (
            <Link className={styles.link} to={x.url} key={nextId()}>
              {x.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Group;
