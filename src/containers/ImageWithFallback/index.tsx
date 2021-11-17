import { NullAvatarSrc } from "assets/img";
import { FC, useCallback, useEffect, useState } from "react";
import styles from './styles.module.scss';

interface IProps {
    src: string;
    errorSrc?: string;
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

/**
 * 
 * @param {string} src - source link of the image
 * @param {string} [errorSrc] - source link of the spare image {NullAvatar}
 * @param {string} [className] - additional classes {undefined}
 * @param {boolean} [withSkeleton] - the statement which shows the skeleton or not {true}
 * @param {string} [skeletonStyles] - class name of the skeleton styles {'skeleton'}
 * @param {string} [alt] - alt prop for the image {''}
 * @param {number | string} [width] - width of the image {16}
 * @param {number | string} [height] - height of the image {16}
 * @returns Wrapped component with fallback src
 */


const FallbackImage: FC<IProps> = ({ src, errorSrc = NullAvatarSrc, withSkeleton = true, className, skeletonStyles = 'skeleton', alt = '', width = 16, height = 16 }) => {

    const [imgState, setImgState] = useState<ImageState>(ImageState.loading);
    const [imgSrc, setImageSrc] = useState<string>(!src ? errorSrc : src);

    const errorHandler = useCallback(() => {
        setImgState(ImageState.error);
        setImageSrc(errorSrc);
    }, [errorSrc])

    const successHandler = useCallback(() => {
        setImgState(ImageState.success);
    }, [])

    useEffect(() => {
        setImageSrc(!src ? errorSrc : src);
        setImgState(ImageState.loading);
    }, [src, errorSrc])

    return (
        <div className={`${className} ${styles.wrapper}`} style={{ width: `${width}px`, height: `${height}px` }}>
            {(imgState === ImageState.loading && withSkeleton) && <div className={styles[skeletonStyles]} style={{ width: `${width}px`, height: `${height}px` }} />}
            <img alt={alt} src={imgSrc} className={`${className} ${styles.image}`} onError={errorHandler} onLoad={successHandler} />
        </div>

    )
}

export default FallbackImage;