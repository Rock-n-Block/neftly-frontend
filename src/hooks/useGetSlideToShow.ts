import { useWindowSize } from 'hooks';

const slidesToShow = (width: number): number => {
  if (width < 650) {
    return 1;
  }
  if (width < 1050) {
    return 2;
  }
  if (width < 1450) {
    return 3;
  }

  return 4;
};

const useGetSlideToShow = (): number => {
  const { width } = useWindowSize();
  return slidesToShow(width);
};

export default useGetSlideToShow;
