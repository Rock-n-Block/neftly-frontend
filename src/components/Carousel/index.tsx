/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import Slider from 'react-slick';
import { arrowLeft } from 'assets/img';
import cx from 'classnames';
import { Button } from 'components';

import styles from './styles.module.scss';

type Props = {
  classNameArrowLeft?: string;
  classNameArrowRight?: string;
  classNameProp?: string;
  slidesToShow?: number;
};

const SimpleSlider: FC<PropsWithChildren<Props>> = ({
  classNameProp,
  children,
  // classNameArrowRight,
  slidesToShow = 1,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function PrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <Button color="outline" className={cx(className, styles.arrowLeft)} onClick={onClick}>
        <img src={arrowLeft} alt="" />
      </Button>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function NextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <Button color="outline" className={cx(className, styles.arrowRight)} onClick={onClick}>
        <img src={arrowLeft} alt="" />
      </Button>
    );
  }

  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(
    (oldI, newI) => {
      setActiveSlideIndex(newI);
      setDragging(true);
    },
    [setDragging],
  );

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [dragging],
  );

  const sliderConfig = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow,
    slidesToScroll: 1,
    dotsClass: styles.slickDots,
    customPaging: (i: number) => (
      <div className={cx(styles.indicator, { [styles.active]: i === activeSlideIndex })} />
    ),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };
  return (
    <Slider className={cx(classNameProp, 'discover-slider')} {...sliderConfig}>
      {React.Children.map(children, (child) => (
        <div onClickCapture={handleOnItemClick}>{child}</div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
