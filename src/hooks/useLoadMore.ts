import { useCallback, useState } from 'react';

const useLoadMore = (initialPage: number) => {
  const [page, setPage] = useState(initialPage);
  const handleLoadMore = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, []);
  return { page, handleLoadMore };
};

export default useLoadMore;
