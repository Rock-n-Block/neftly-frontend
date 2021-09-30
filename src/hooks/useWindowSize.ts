import { useEffect, useState } from 'react';
import { WindowSize } from 'typings';

// eslint-disable-next-line @typescript-eslint/ban-types
const useResize = (fn: Function = () => {}): WindowSize => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function updateSize() {
      setWidth(+window.innerWidth);
      setHeight(+window.innerHeight);
      fn(width, height);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  });

  return {
    width,
    height,
  };
};

export default useResize;
