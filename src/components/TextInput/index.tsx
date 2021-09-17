import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './TextInput.module.scss';

interface ITextInputProps {
  className?: string;
  label: string;
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
}

const TextInput: React.FC<ITextInputProps> = ({
  className,
  label,
  prefix,
  suffix,
  onChange,
  value,
  suffixClassName,
  name,
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
        {prefixElement}
        <input
          id={name}
          value={value}
          className={cn(styles.input)}
          onChange={onChange}
          onWheel={(e) => e.currentTarget.blur()}
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
