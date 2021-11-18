import { useState, useEffect } from 'react';

type Tfunc = (state?: boolean) => (state: boolean) => void;

const useNoScroll: Tfunc = (state = false) => {
    const [scroll, setScroll] = useState<boolean>(state);
    const body = document.querySelector('body');

    useEffect(() => {
        if (scroll) {
            if (body) {
                body.style.overflow = 'hidden';
            }
        } else
            if (body) {
                body.style.overflow = 'auto';
            }

    }, [scroll, body])

    return setScroll
}

export default useNoScroll