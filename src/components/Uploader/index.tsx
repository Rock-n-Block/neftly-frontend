import React, { useCallback } from 'react';
import { message, Upload } from 'antd';
import cn from 'classnames';
import { useFormikContext } from 'formik';

import styles from './Uploader.module.scss';
import { Button } from 'components';
import { checkValidFileType } from '../../utils/checkValidFileType';

const { Dragger } = Upload;

interface IUploader {
  type: 'img' | 'cover';
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
  // const [imageUrl, setImageUrl] = React.useState('');
  const getBase64 = useCallback(
    (img: any, callback: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (type === 'img') {
          formik.setFieldValue('preview', reader.result);
        }
        if (type === 'cover') {
          formik.setFieldValue('coverPreview', reader.result);
        }
        callback(reader.result);
      });
      reader.readAsDataURL(img);
    },
    [formik, type],
  );
  const beforeUpload = useCallback(
    (file: any) => {
      const isValidType = checkValidFileType(file, type);
      if (!isValidType) {
        message.error('You can only upload JPG/PNG/WEBP/GIF file!');
      }
      const isLt2M = file.size / 1024 / 1024 <= MAX_FILE_SIZE;
      if (!isLt2M) {
        message.error('Image must be smaller than 30MB!');
      }
      return isValidType && isLt2M;
    },
    [type],
  );
  const handleChange = useCallback(
    ({ file }: any) => {
      if (isLoading) {
        return;
      }
      const isValidType = checkValidFileType(file, type);
      if (!isValidType) {
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < MAX_FILE_SIZE;
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
        getBase64(file.originFileObj, () => {});
      }
    },
    [formik, getBase64, handleUpload, isLoading, setFormat, type],
  );
  return (
    <div className={cn(className, !isButton ? styles.uploader : '')}>
      {isButton ? (
        <Upload
          beforeUpload={beforeUpload}
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
          beforeUpload={beforeUpload}
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
