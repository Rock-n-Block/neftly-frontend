import {createContext, FC, useState} from "react";
import PopoverButton, {IPopoverButton} from './PopoverButton';
import PopoverBody, {IPopoverBody} from './PopoverBody';
import styles from "./styles.module.scss";
import cn from "classnames";

export interface IPopoverContext {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const PopoverContext = createContext<IPopoverContext | undefined>(undefined);

interface IPopover {
  Button: FC<IPopoverButton>;
  Body: FC<IPopoverBody>;
}

interface IPopoverProps {
  className?: string;
}

const Popover: FC<IPopoverProps> & IPopover = ({className, children}) => {
  const [visible, setVisible] = useState(false);

  return (
    <PopoverContext.Provider value={{visible, setVisible}}>
      <div className={cn(styles.popoverContainer, className)}>{children}</div>
    </PopoverContext.Provider>
  )
}
Popover.Button = PopoverButton;
Popover.Body = PopoverBody;

export default Popover;
