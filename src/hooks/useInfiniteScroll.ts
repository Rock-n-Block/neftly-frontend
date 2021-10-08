import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  isNeedLoad: boolean,
  isLoading: boolean,
  loadMore: any,
  handleChangePage: any,
) => {
  const anchor = useRef<Element>(null);
  console.log(isLoading, isNeedLoad, 'infinite prarms');
  const callback = useCallback(
    () => {
      if (isNeedLoad && !isLoading) {
        console.log('in hook');
        loadMore();
        handleChangePage();
      }
    },
    [isNeedLoad, isLoading, loadMore, handleChangePage],
  );
  // debugger;

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const intObserver = new IntersectionObserver(callback, options);
    if (anchor && anchor.current) {
      intObserver.observe(anchor.current);
    }

    const currentAnchor = anchor.current;

    return () => intObserver.unobserve(currentAnchor as any);
  }, [callback]);

  return anchor;
};
