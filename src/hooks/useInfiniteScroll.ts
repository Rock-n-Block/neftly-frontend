import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (isNeedLoad: boolean, isLoading: boolean, isLessThanMinimum: boolean) => {
  const anchor = useRef<Element>(null);

  const loadMore = () => alert('1');

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = () => {
      if (isNeedLoad && !isLoading && !isLessThanMinimum) loadMore();
    };

    const intObserver = new IntersectionObserver(callback, options);
    if (anchor && anchor.current) {
      intObserver.observe(anchor.current);
    }

    const currentAnchor = anchor.current;

    return () => intObserver.unobserve(currentAnchor as any);
  }, [isNeedLoad, isLoading, isLessThanMinimum]);

  return anchor;
};
