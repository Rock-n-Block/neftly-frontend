import Icon, { IIcons } from '../Icon';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './TextInput.module.scss';

interface Props {
  className?: string;
  label?: string;
  name?: string;
  type: string;
  placeholder: string;
  required?: boolean;
  prefix?: string;
  suffix?: any;
  suffixClassName?: string;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  icon?: IIcons;
}

const TextInput: React.FC<Props> = ({
  className,
  label,
  suffix,
  onChange,
  value,
  suffixClassName,
  name,
  disabled,
  prefix,
  error,
  icon,
  ...props
}) => {
  const ref = useRef(null);
  const [elWidth, setElWidth] = useState(0);
  const prefixElement = (
    <div ref={ref} className={styles.prefix}>
      {prefix}
    </div>
  );

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line
      // @ts-ignore
      setElWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        {icon && (
          <Icon
            className={cn(styles.icon, { [styles.disabled]: disabled })}
            name={icon}
            size="24"
            fill="#fff"
          />
        )}
        {prefixElement}
        <input
          id={name}
          value={value}
          className={cn(styles.input, { [styles.error]: error, [styles.withIcon]: icon })}
          onChange={onChange}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          {...props}
          style={
            elWidth
              ? { paddingLeft: `${elWidth + 24}px`, paddingRight: suffix ? '74px' : '' }
              : { paddingRight: suffix ? '74px' : '' }
          }
        />
        <div className={cn(styles.suffix, suffixClassName)}>{suffix}</div>
      </div>
    </div>
  );
};

export default TextInput;
