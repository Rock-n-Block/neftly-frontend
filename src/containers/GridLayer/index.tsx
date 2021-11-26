import {
  Children,
  FC,
  memo,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import WrappedItem, { IItemPosition } from './WrappedItem';

import styles from './style.module.scss';

export enum EGridJustify {
  start,
  center,
  end,
}

export interface IGridLayerProps {
  minWidth: number;
  minHeight: number;
  wrapperRef?: RefObject<any>;
  maxColumns?: number;
  gap?: number;
  justify?: EGridJustify;
  depenednciesForChange?: Array<any>;
}

type ICardStyles = {
  width: number;
  height: number;
};

const GridLayer: FC<PropsWithChildren<IGridLayerProps>> = ({
  minWidth,
  minHeight,
  wrapperRef,
  maxColumns = null,
  gap = 10,
  children,
  justify = 'start',
  depenednciesForChange = null,
}) => {
  const [cardStyles, setCardStyles] = useState<ICardStyles>({ width: minWidth, height: minHeight });
  const [columns, setColumns] = useState<number>(
    Math.trunc(document.documentElement.clientWidth / (cardStyles.width + gap)) - 1,
  );
  const childrenCount = Children.count(children);

  const resizeCallback = useCallback(async () => {
    const winWidth = wrapperRef?.current?.offsetWidth || document.documentElement.clientWidth;

    const newColumns = Math.trunc(winWidth / (minWidth + gap));

    if ((maxColumns === null || newColumns <= maxColumns) && newColumns >= 1) {
      await setColumns(newColumns);
    }

    setCardStyles((prevStyle: ICardStyles) => ({
      ...prevStyle,
      width: (winWidth - gap * (columns - 1)) / columns,
      height: minHeight + (winWidth / columns - minWidth),
    }));
  }, [minWidth, columns, maxColumns, gap, wrapperRef, minHeight]);

  useEffect(() => {
    window.addEventListener('resize', resizeCallback);

    resizeCallback();
    return () => {
      window.removeEventListener('resize', resizeCallback);
    };
  }, [resizeCallback, wrapperRef]);

  useEffect(() => {
    resizeCallback();
  }, [depenednciesForChange, resizeCallback]);

  return (
    <section
      className={styles.gridWrapper}
      style={{ height: (cardStyles.height + gap) * Math.ceil(childrenCount / columns) }}
    >
      {Children.map(children, (child, idx) => {
        const position: IItemPosition = {
          width: cardStyles.width,
          height: cardStyles.height,
          left:
            (idx % columns) * cardStyles.width +
            (idx % columns) * gap +
            (justify === EGridJustify.center && idx >= childrenCount - (childrenCount % columns)
              ? cardStyles.width / 2
              : 0) +
            (justify === EGridJustify.end && idx >= childrenCount - (childrenCount % columns)
              ? cardStyles.width
              : 0),
          top: Math.trunc(idx / columns) * (cardStyles.height + gap),
        };
        return (
          <WrappedItem key={child?.toString()} position={position}>
            {child}
          </WrappedItem>
        );
      })}
    </section>
  );
};

export default memo(GridLayer);
