import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import styles from './ScrollToTop.module.scss';

// TODO: fix any property
const ScrollToTop: React.FC<any> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default withRouter(ScrollToTop);
