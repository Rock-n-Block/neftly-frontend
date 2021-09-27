import { FC, useMemo } from 'react';
import cx from 'classnames';
import { Switcher, Text } from 'components';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './styles.scss';
import styles from './styles.module.scss';

type Props = {
  top?: boolean;
  isSwitcher?: boolean;
  value?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  isVertical?: boolean;
  isManageBtnVisible?: boolean;
  className?: string;
  classNameWrap?: string;
  isCurrenciesVisible?: boolean;
  valueSwitcher?: boolean;
  onChange?: (value: number) => void;
  onSwitcher?: (value: boolean) => void;
};

const RangePicker: FC<Props> = ({
  top,
  isSwitcher,
  label = '',
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  isVertical = false,
  isManageBtnVisible = false,
  isCurrenciesVisible = true,
  className,
  classNameWrap,
  valueSwitcher,
  onChange = () => {},
  onSwitcher = () => {},
}) => {
  const input = useMemo(
    () => (
      <div className={cx(styles.values, top && styles.top)}>
        <input
          type="text"
          value={value || '0'}
          className={styles.valueInput}
          onChange={(e) => {
            const numberValue = Number(e.target.value.replace(/[^0-9.]/g, ''));
            onChange(numberValue > max ? max : numberValue);
          }}
        />
        <Text className={styles.maxValue}>{max}</Text>
      </div>
    ),
    [top, value, max, onChange],
  );

  return (
    <div
      className={cx(
        styles.container,
        {
          [styles.verticalContainer]: isVertical,
        },
        classNameWrap,
      )}
    >
      {top && input}

      {isSwitcher && (
        <Switcher
          className={styles.switcher}
          leftLabel="R"
          rightLabel="B"
          classNameLeft={cx(styles.switcherBtn, styles.switcherBtnLeft)}
          classNameRight={cx(styles.switcherBtn, styles.switcherBtnRight)}
          classNameActive={styles.activeSwitcher}
          checked={Boolean(valueSwitcher)}
          onChange={onSwitcher}
        />
      )}

      {label && (
        <div className={styles.labelWrap}>
          <Text className={styles.label}>{label}</Text>
          {isCurrenciesVisible && (
            <Text size="m" className={styles.currency}>
              {value} TRX{' '}
              <Text tag="span" color="secondary">
                value
              </Text>
            </Text>
          )}
        </div>
      )}
      <div className={styles.sliderContainer}>
        {isManageBtnVisible && (
          <button
            type="button"
            className={cx(styles.manageBtn, styles.manageBtnMinus)}
            onClick={() => {
              const res = value - step;
              onChange(res < 0 ? 0 : res);
            }}
          >
            -
          </button>
        )}

        <Slider
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore (rc-slider show that className invalid prop, but exist
          className={cx(styles.slider, 'rc-slider-wrap', className)}
          value={value}
          min={min}
          max={max}
          step={step}
          vertical={isVertical}
          onChange={onChange}
          railStyle={
            isVertical
              ? {
                  width: 6,
                  backgroundColor: 'white',
                }
              : {}
          }
        />

        {isManageBtnVisible && (
          <button
            type="button"
            className={cx(styles.manageBtn, styles.manageBtnPlus)}
            onClick={() => {
              const res = value + step;
              onChange(res > max ? max : res);
            }}
          >
            +
          </button>
        )}
      </div>

      {!top && input}
    </div>
  );
};

export default RangePicker;
