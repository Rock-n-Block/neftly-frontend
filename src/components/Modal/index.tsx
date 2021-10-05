import React, {useCallback, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import cn from 'classnames';

import Icon from '../Icon';

import styles from './Modal.module.scss';

// TODO: убрать any
const Modal: React.FC<any> = ({
                                outerClassName,
                                containerClassName,
                                visible,
                                onClose,
                                children,
                              }) => {
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      disableBodyScroll(scrollRef.current!);
    } else {
      enableBodyScroll(scrollRef.current!);
    }
  }, [visible]);

  return createPortal(
    visible && (
      <div className={styles.modal} ref={scrollRef}>
        <div className={cn(styles.outer, outerClassName)}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container, containerClassName)}>
              {children}
              <button type="button" className={styles.close} onClick={onClose}>
                <Icon name="close" size="14"/>
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    document.body,
  );
};

export default Modal;
