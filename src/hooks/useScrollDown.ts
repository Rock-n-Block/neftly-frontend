import { useEffect } from 'react';
import { TNullable } from 'typings';

const useScrollDown = (
  ref: React.MutableRefObject<TNullable<HTMLDivElement>>,
  top?: string,
  down?: string,
) => {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    const listener = () => {
      const currentScrollPos = window.pageYOffset;
      if (ref?.current) {
        if (prevScrollpos - currentScrollPos < -50) {
          ref.current.style.top = top || `-${ref.current.offsetHeight}px`;
          prevScrollpos = currentScrollPos;
        }
        if (prevScrollpos - currentScrollPos > 50) {
          ref.current.style.top = down || '0';
          prevScrollpos = currentScrollPos;
        }
      }
    };

    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, [ref, top, down]);
};

export default useScrollDown;
