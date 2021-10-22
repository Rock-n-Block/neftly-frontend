import { FC } from 'react';

import { Button, H4, Loader } from 'components';

import styles from './LoadMore.module.scss';

interface ILoadMore {
  itemsLength: number;
  isLoading: boolean;
  currentPage: number;
  allPages: number;
  handleLoadMore: () => void;
}

const LoadMore: FC<ILoadMore> = ({
  children,
  itemsLength,
  isLoading,
  currentPage,
  allPages,
  handleLoadMore,
}) => {
  return (
    <div className={styles.container}>
      {children}
      {!itemsLength && !isLoading ? <H4>No matches</H4> : ''}
      {isLoading ? <Loader className={styles.loader} /> : ''}
      {currentPage < allPages && !isLoading && itemsLength ? (
        <div className={styles.viewMoreBtnWrapper}>
          <Button color="outline" className={styles.viewMoreBtn} onClick={handleLoadMore}>
            View More
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMore;
