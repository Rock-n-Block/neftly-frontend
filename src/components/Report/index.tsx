import cn from 'classnames';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import React from 'react';
import { observer } from 'mobx-react-lite';

import { storeApi } from 'services/api';
import { TextArea, Button, Text } from 'components';
import { useMst } from 'store';

import styles from './Report.module.scss';

interface IReportProps {
  className?: string;
}

const Report: React.FC<IReportProps> = ({ className }) => {
  const {
    modals: { report },
  } = useMst();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const link = window.location;

  const [reportMessage, setReportMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReportMessage(value);
  }, []);

  const handleClose = React.useCallback(() => {
    report.close();
  }, [report]);

  const submitReport = React.useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    setIsLoading(true);
    await executeRecaptcha('report').then((responseToken: string) => {
      storeApi
        .reportPage(link.toString(), reportMessage, responseToken)
        .then(() => {
          setIsLoading(false);
          handleClose();
        })
        .catch((error: any) => {
          setIsLoading(false);
          console.error(error, 'report not submitted');
        });
    });
  }, [executeRecaptcha, link, reportMessage, handleClose]);

  return (
    <div className={cn(className, styles.transfer)}>
      <Text className={styles.text} color="lightGray" size="m" weight="medium">
        Describe why you think this item should be removed from marketplace
      </Text>
      <TextArea
        className={styles.field}
        label="Message"
        onChange={onChange}
        name="Message"
        placeholder="Tell us the details"
        required
      />
      <div className={styles.btns}>
        <Button
          type="button"
          className={cn('button', styles.button)}
          onClick={submitReport}
          loading={isLoading}
          color="blue"
        >
          Send now
        </Button>
        <Button
          type="button"
          className={cn('button-stroke', styles.button)}
          onClick={handleClose}
          color="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default observer(Report);
