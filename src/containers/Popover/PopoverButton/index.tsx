import {FC} from "react";
import {Button} from "components";
import {usePopover} from "hooks";

export interface IPopoverButton {
  className?: string;
}

const PopoverButton: FC<IPopoverButton> = ({className, children}) => {
  const {changePopoverVisibility} = usePopover();

  return (
    <Button color="transparent" onClick={changePopoverVisibility} className={className}>
      {children}
    </Button>
  )
}
export default PopoverButton;
