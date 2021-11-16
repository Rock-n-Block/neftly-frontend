import { FC, useCallback, useState } from "react";
import styles from './styles.module.scss';

interface IProps {
    src: string;
    errorSrc: string;
    className?: string;
    withSkeleton?: boolean;
    skeletonStyles?: string;
    alt?: string;
    width?: number | string,
    height?: number | string,
}

enum ImageState {
    loading,
    error,
    success
}

const WrappedImage: FC<IProps> = ({ src, errorSrc, withSkeleton = true, className, skeletonStyles = 'skeleton', alt = '', width = 16, height = 16 }) => {

    const [imgState, setImgState] = useState<ImageState>(ImageState.loading);
    const [imgSrc, setImageSrc] = useState<string>(src || errorSrc);

    const errorHandler = useCallback(() => {
        setImgState(ImageState.error);
        setImageSrc(errorSrc);
    }, [errorSrc])

    const successHandler = useCallback(() => {
        setImgState(ImageState.success);
    }, [])

    return (
        <img alt={alt} src={imgSrc} width={width} height={height} onError={errorHandler} onLoad={successHandler} className={`${(withSkeleton && imgState === ImageState.loading) && styles[skeletonStyles]} ${className}`} />
    )
}

export default WrappedImage;