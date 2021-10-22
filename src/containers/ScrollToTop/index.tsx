import { FC, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

import styles from './ScrollToTop.module.scss';

const ScrollToTop: FC = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default withRouter(ScrollToTop);
