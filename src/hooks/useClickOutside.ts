import { useEffect, RefObject } from 'react';

type handlerType = () => void

const useClickOutside = (ref: RefObject<any>, handler: handlerType, btnRef?: RefObject<any>) => {
    useEffect(() => {

        const listener = (event: UIEvent) => {

            if (ref.current) {
                if (!ref.current || ref.current.contains(event.target) || (btnRef?.current && btnRef.current.contains(event.target))) {
                    return
                }
                handler();
            }

        };
        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler, btnRef]);
};

export default useClickOutside;