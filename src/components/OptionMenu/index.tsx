import style from './style.module.scss';
import { FC, memo, ReactNode, RefObject } from 'react';

export type positionOptions = 'top-left' | 'top-center' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface IOptionProps{
    active: boolean,
    children?: ReactNode
    position?: positionOptions,
    withTransition?: boolean,
    wrapRef?: RefObject<HTMLElement>
}

const OptionMenu: FC<IOptionProps> = ({ active, wrapRef, children, position = 'bottom-right', withTransition = true }) => {
    //
    return (
        <section ref={wrapRef} className={`${style.wrapper} ${style[position]} ${active ? style.active : style.hidden} ${withTransition && style.transition}`}>
            {children}
        </section>
    )
}

export default memo(OptionMenu);
