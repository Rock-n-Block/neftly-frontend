import cn from 'classnames';
import styles from './TextArea.module.scss';

import {emoji, italic, olList, ulList, link, bold} from 'assets/img/icons/textEditor';
import {Button} from "../index";

interface ITextAreaProps {
  className?: string;
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (value: any) => void;
  value?: string;
  editable?: boolean;
  maxLettersCount?: number;
}

const TextArea: React.FC<ITextAreaProps> = ({
                                              className,
                                              label,
                                              onChange,
                                              value,
                                              editable = false,
                                              maxLettersCount,
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
  }
  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <textarea value={value} onChange={handleChange} className={styles.textarea} {...props} />
        {editable ? (
          <div className={styles.edit}>
            <Button color="transparent">
              <img src={emoji} alt='emoji' width={24} height={24}/></Button>
            <Button color="transparent">
              <img src={bold} alt='emoji' width={24} height={24}/></Button>
            <Button color="transparent">
              <img src={italic} alt='emoji' width={24} height={24}/></Button>
            <Button color="transparent">
              <img src={olList} alt='emoji' width={24} height={24}/></Button>
            <Button color="transparent">
              <img src={ulList} alt='emoji' width={24} height={24}/></Button>
            <Button color="transparent">
              <img src={link} alt='emoji' width={24} height={24}/></Button>


          </div>
        ) : (<></>)}
        {maxLettersCount ? (<p>{value?.length}/{maxLettersCount}</p>) : (<></>)}
      </div>
    </div>
  );
};

export default TextArea;
