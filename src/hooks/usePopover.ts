import { useContext } from 'react';

import { PopoverContext } from '../containers/Popover';

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('This component must be used within a <Popover> component.');
  }

  const { visible, setVisible, showOnHover, setShowOnHover, position, setPosition } = context;

  const changePopoverVisibility = () => setVisible(!visible);

  const closePopover = () => setVisible(false);

  return {
    visible,
    showOnHover,
    position,
    setVisible,
    changePopoverVisibility,
    closePopover,
    setShowOnHover,
    setPosition,
  };
};
export default usePopover;
