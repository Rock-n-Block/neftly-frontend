// import useDarkMode from 'use-dark-mode';

interface IImage {
  className?: string;
  src: string;
  srcDark?: string;
  srcSet?: string;
  srcSetDark?: string;
  alt: string;
}

const Image: React.FC<IImage> = ({ className, src, alt }) => {
  // const darkMode = useDarkMode(false);

  return (
    <img
      className={className}
      // srcSet={darkMode.value ? srcSetDark : srcSet}
      src={src}
      alt={alt}
    />
  );
};

export default Image;
