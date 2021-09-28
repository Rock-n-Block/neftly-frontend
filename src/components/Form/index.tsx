import cn from 'classnames';

import Icon from '../Icon';

import styles from './Form.module.scss';

interface IFormProps {
  className?: string;
  onSubmit: () => void;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type: string;
  name: string;
}

const Form: React.FC<IFormProps> = ({
  className,
  onSubmit,
  placeholder,
  value,
  setValue,
  type,
  name,
}) => {
  return (
    <form className={cn(styles.form, className)} action="" onSubmit={onSubmit}>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
        required
      />
      <button type="button" className={styles.btn}>
        <Icon name="arrow-next" size="14" />
      </button>
    </form>
  );
};

export default Form;
