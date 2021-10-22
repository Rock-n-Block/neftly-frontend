import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  pointer1: number,
  pointer2: number,
  updatePointer: (value: number) => void,
  isFetching: boolean,
) => {
  const anchor = useRef<Element>(null);

  const callback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];
      if (pointer1 < pointer2 && isIntersecting && !isFetching) {
        updatePointer(pointer1 + 1);
      }
    },
    [pointer1, pointer2, isFetching, updatePointer],
  );

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const intObserver = new IntersectionObserver(callback, options);
    if (anchor.current) {
      intObserver.observe(anchor.current);
    }

    const currentAnchor = anchor.current;

    return () => intObserver.unobserve(currentAnchor as any);
  }, [callback]);

  return anchor;
};
