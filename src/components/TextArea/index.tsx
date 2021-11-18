import cn from 'classnames';

import styles from './TextArea.module.scss';

interface ITextAreaProps {
  className?: string;
  label: any;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (value: any) => void;
  value?: string;
  editable?: boolean;
  maxLettersCount?: number;
  disabled?: boolean;
}

const TextArea: React.FC<ITextAreaProps> = ({
  className,
  label,
  onChange,
  value,
  maxLettersCount,
  disabled,
  ...props
}) => {
  const handleChange = (e: any) => {
    if (onChange) {
      if (maxLettersCount) {
        if (e.target.value?.length <= maxLettersCount) {
          onChange(e);
        }
      } else {
        onChange(e);
      }
    }
  };
  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <textarea
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className={styles.textarea}
          {...props}
        />
        {maxLettersCount ? (
          <p className={styles.counter}>
            {value?.length}/{maxLettersCount}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TextArea;
