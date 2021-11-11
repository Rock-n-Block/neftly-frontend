import React from 'react';
import cn from 'classnames';

import styles from './Radio.module.scss';

export interface IRadioButton {
  value: string;
  optionTitle: string;
  optionInfo?: string;
}

interface RadioProps {
  name: string;
  controlledValue: string;
  onChange: (e: any) => void;
  options: IRadioButton[];
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  options,
  className,
  name,
  controlledValue,
  onChange,
  ...otherRadioProps
}) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.radio}>
      {options.map((option) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className={cn(
            styles.option,
            className,
            controlledValue === option.value ? styles.active : '',
          )}
          key={`${name}_radio_${option.value}_option `}
          {...otherRadioProps}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            className={styles.input}
            onChange={handleChange}
          />
          <h4 className={styles.optionTitle}>{option.optionTitle}</h4>
          <p className={styles.optionInfo}>{option.optionInfo}</p>
        </label>
      ))}
    </div>
  );
};

export default Radio;
