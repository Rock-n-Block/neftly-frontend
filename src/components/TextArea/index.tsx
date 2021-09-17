import cn from 'classnames';
import styles from './TextArea.module.scss';

interface ITextAreaProps {
  className?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (value: any) => void;
  value?: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ className, label, onChange, value, ...props }) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <textarea value={value} onChange={onChange} className={styles.textarea} {...props} />
      </div>
    </div>
  );
};

export default TextArea;
