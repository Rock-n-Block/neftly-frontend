import {FC} from "react";
import styles from "./styles.module.scss";
import {usePopover} from "hooks";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";


export interface IPopoverBody {
  className?: string;
}

const PopoverBody: FC<IPopoverBody> = ({className, children}) => {
  const {visible, closePopover, position} = usePopover();

  if (!visible) {
    return (null)
  }
  return (
    <div className={cn(styles.body, className, styles[position || 'right'])}>
      <OutsideClickHandler onOutsideClick={closePopover}>
        <div className={styles.triangle}/>
        {children}
      </OutsideClickHandler>
    </div>
  )
}
export default PopoverBody;
