import cn from 'classnames';

import TextArea from '../TextArea';

import styles from './Report.module.scss';

interface IReportProps {
  className?: string;
}

const Report: React.FC<IReportProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>Report</div>
      <div className={styles.text}>
        Describe why you think this item should be removed from marketplace
      </div>
      <TextArea
        className={styles.field}
        label="message"
        name="Message"
        placeholder="Tell us the details"
        required
      />
      <div className={styles.btns}>
        <button type="button" className={cn('button', styles.button)}>
          Send now
        </button>
        <button type="button" className={cn('button-stroke', styles.button)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Report;
