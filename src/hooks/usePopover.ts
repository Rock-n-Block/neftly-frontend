import {PopoverContext} from "../containers/Popover";
import {useContext} from "react";

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("This component must be used within a <Popover> component.")
  }

  const {visible, setVisible} = context;

  const changePopoverVisibility = () => setVisible(!visible);

  const closePopover = () => setVisible(false);

  return {visible, setVisible,changePopoverVisibility, closePopover};
}
export default usePopover;
