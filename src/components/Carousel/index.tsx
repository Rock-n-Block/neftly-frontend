/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import Slider, { ResponsiveObject } from 'react-slick';
import { arrowLeft } from 'assets/img';
import cx from 'classnames';
import { Button } from 'components';

import styles from './styles.module.scss';

type Props = {
  classNameArrowLeft?: string;
  classNameArrowRight?: string;
  classNameProp?: string;
  slidesToShow?: number;
  hideArrows?: boolean;
  responsive?: ResponsiveObject[];
};

const SimpleSlider: FC<PropsWithChildren<Props>> = ({
  classNameProp,
  children,
  // classNameArrowRight,
  slidesToShow = 1,
  responsive,
  hideArrows = false,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function PrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <Button
        padding="0"
        color="outline"
        className={cx(className, styles.arrowLeft)}
        onClick={onClick}
      >
        <img src={arrowLeft} alt="" />
      </Button>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function NextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <Button
        padding="0"
        color="outline"
        className={cx(className, styles.arrowRight)}
        onClick={onClick}
      >
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
    infinite: React.Children.count(children) > 3,
    speed: 400,
    slidesToShow,
    slidesToScroll: slidesToShow,
    dotsClass: styles.slickDots,
    customPaging: (i: number) => (
      <div className={cx(styles.indicator, { [styles.active]: i === activeSlideIndex })} />
    ),
    prevArrow: !hideArrows ? <PrevArrow /> : undefined,
    nextArrow: !hideArrows ? <NextArrow /> : undefined,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive,
  };
  return (
    <Slider
      className={cx(classNameProp, 'discover-slider', { 'hide-arrows': hideArrows })}
      {...sliderConfig}
    >
      {React.Children.map(children, (child, index) => (
        <div onClickCapture={handleOnItemClick} key={index}>
          {child}
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
