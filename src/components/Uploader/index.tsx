import React, { useCallback } from 'react';
import { message, Upload } from 'antd';
import cn from 'classnames';
import { useFormikContext } from 'formik';

import styles from './Uploader.module.scss';
import { Button } from 'components';
import { checkValidFileType, getBase64, FileType, beforeUpload, checkValidFileSize } from 'utils';
import { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;

interface IUploader {
  type: FileType;
  className?: string;
  isLoading?: boolean;
  handleUpload?: (value: string) => void;
  setFormat?: (value: string) => void;
  name?: string;
  isButton?: boolean;
}

const Uploader: React.FC<IUploader> = ({
  type,
  className,
  children,
  handleUpload,
  setFormat,
  name,
  isButton,
  isLoading,
}) => {
  const formik = useFormikContext();
  const MAX_FILE_SIZE = 30;
  const handleChange = useCallback(
    ({ file }: any) => {
      if (isLoading) {
        return;
      }
      const isValidType = checkValidFileType(file.type, type);
      if (!isValidType) {
        return;
      }
      const isLt2M = checkValidFileSize(file.size, MAX_FILE_SIZE);
      if (!isLt2M) {
        return;
      }
      if (type === 'img' && setFormat) {
        setFormat(file.type.slice(0, file.type.indexOf('/')));
      }
      if (handleUpload) {
        handleUpload(file.originFileObj);
      } else {
        formik.setFieldValue(type, file.originFileObj);
        getBase64(file.originFileObj, type, () => {}, formik);
      }
    },
    [formik, handleUpload, isLoading, setFormat, type],
  );

  const doBeforeUpload = useCallback(
    (file: RcFile) => {
      return beforeUpload(file, type, MAX_FILE_SIZE, message);
    },
    [type],
  );
  return (
    <div className={cn(className, !isButton ? styles.uploader : '')}>
      {isButton ? (
        <Upload
          beforeUpload={doBeforeUpload}
          onChange={handleChange}
          multiple={false}
          showUploadList={false}
        >
          {children || (
            <Button color="outline" className={styles.button}>
              Upload
            </Button>
          )}
        </Upload>
      ) : (
        <Dragger
          id={name}
          beforeUpload={doBeforeUpload}
          onChange={handleChange}
          onDrop={handleChange}
          multiple={false}
          showUploadList={false}
        />
      )}
    </div>
  );
};

Uploader.defaultProps = {
  name: '',
  className: '',
  setFormat: () => {},
  isButton: false,
};

export default Uploader;
