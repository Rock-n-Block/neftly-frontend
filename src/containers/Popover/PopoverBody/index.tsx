import {FC} from "react";
import styles from "./styles.module.scss";
import {usePopover} from "hooks";
import cn from "classnames";


export interface IPopoverBody {
  className?: string;
}

const PopoverBody: FC<IPopoverBody> = ({className, children}) => {
  const {visible} = usePopover();

  if (!visible) {
    return (null)
  }
  return (
    <div className={cn(styles.body, className)}>
      <div className={styles.triangle}/>
      {children}
    </div>
  )
}
export default PopoverBody;
