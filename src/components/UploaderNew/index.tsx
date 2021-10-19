import { FileRejection, useDropzone } from 'react-dropzone';
import styles from './Uploader.module.scss';
import cn from 'classnames';
import { FC } from 'react';
import { Button } from 'components';
import { fileValidation } from 'utils';
import { useFormikContext } from 'formik';
import { toast } from 'react-toastify';

interface IProps {
  isLoading?: boolean;
  handleUpload?: (value: string) => void;
  className?: string;
  isButton?: boolean;
  formikValue: string | 'cover'; // cover for video/audio
  setFormat?: (format: string) => void;
  maxSizeInMb?: number;
}

export type TFile =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg'
  | 'image/svg+xml'
  | 'image/png'
  | 'image/webp'
  | 'image/gif'
  | 'video/mp4'
  | 'audio/mpeg';

const UploaderNew: FC<IProps> = ({
  className,
  // handleUpload,
  formikValue,
  isButton = false,
  isLoading,
  setFormat,
  maxSizeInMb = 30,
  children,
}) => {
  const formik = useFormikContext();

  console.log(isLoading);

  const handleChange = <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[]) => {
    if (!acceptedFiles.length) {
      toast.error(fileRejections[0].errors[0].message);
      return;
    }
    const currentFile = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(currentFile);
    // add preview to formik
    if (formikValue === 'cover') {
      formik.setFieldValue('coverPreview', fileUrl);
    } else {
      formik.setFieldValue('preview', fileUrl);
    }
    formik.setFieldValue(formikValue, currentFile);
    if (setFormat && formikValue !== 'cover') {
      setFormat(currentFile.type.slice(0, currentFile.type.indexOf('/')));
    }
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    validator: (file) => fileValidation(file, maxSizeInMb),
    onDrop: handleChange,
  });

  return (
    <div className={cn(className, !isButton ? styles.uploader : '')}>
      {isButton ? (
        <>
          <input {...getInputProps()} />
          {children || (
            <Button color="outline" className={styles.button} onClick={open}>
              Upload
            </Button>
          )}
        </>
      ) : (
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {children}
        </div>
      )}
    </div>
  );
};

export default UploaderNew;
