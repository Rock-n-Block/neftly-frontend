import { FC, memo, PropsWithChildren } from "react";
import styles from './style.module.scss';

export type IItemPosition = {
    width: number,
    height: number,
    top: number,
    left: number,
}

interface IWrappedItemProps {
    position: IItemPosition,
}

const WrappedItem: FC<PropsWithChildren<IWrappedItemProps>> = ({ children, position }) => {
    
    return (
        <div className={styles.itemWrapper} style={{
            ...position
        }}>{children}</div>
    )
}

export default memo(WrappedItem)