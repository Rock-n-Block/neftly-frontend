import React, { useState } from 'react';
import cn from 'classnames';

import Icon from '../../../../components/Icon';

import styles from './Add.module.scss';

interface IAddProps {
  className?: string;
}

const Add: React.FC<IAddProps> = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <button
      type="button"
      className={cn(className, styles.add, {
        [styles.active]: visible,
      })}
      onClick={() => setVisible(!visible)}
    >
      <Icon name="add-square" size="24" />
      <Icon name="minus-square" size="24" />
    </button>
  );
};

export default Add;
