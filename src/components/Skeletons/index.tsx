import { FC } from "react";
import styles from './styles.module.scss';

export interface ISkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

const Skeleton: FC<ISkeletonProps> = ({ width = '100%', height = '100%', className, borderRadius }) => {
    return (
        <div style={{ width, height, borderRadius }} className={`${styles.skeleton} ${className}`} />
    )
}

export default Skeleton;