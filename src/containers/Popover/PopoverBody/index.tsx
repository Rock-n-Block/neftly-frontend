import { FC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';
import { usePopover } from 'hooks';

import styles from './styles.module.scss';

export interface IPopoverBody {
  className?: string;
}

const PopoverBody: FC<IPopoverBody> = ({ className, children }) => {
  const { visible, closePopover, position } = usePopover();

  if (!visible) {
    return null;
  }
  return (
    <div className={cn(styles.body, className, styles[position || 'right'])}>
      <OutsideClickHandler onOutsideClick={closePopover}>
        <div className={styles.triangle} />
        {children}
      </OutsideClickHandler>
    </div>
  );
};
export default PopoverBody;
