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
  handleUpload?: (value: File) => void;
  className?: string;
  isButton?: boolean;
  colorButton?: 'purple' | 'outline' | 'transparent' | 'pink' | 'dark' | 'black' | 'blue';
  formikValue?: string | 'cover'; // cover for video/audio
  setFormat?: (format: string) => void;
  maxSizeInMb?: number;
  isImgOnly?: boolean;
}

type TImage =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/svg'
  | 'image/svg+xml'
  | 'image/png'
  | 'image/webp'
  | 'image/gif';
type TOtherMedia = 'video/mp4' | 'audio/mpeg';
export type TFile = TImage | TOtherMedia;

const Uploader: FC<IProps> = ({
  className,
  // handleUpload,
  formikValue,
  isButton = false,
  isLoading,
  colorButton = 'outline',
  handleUpload,
  setFormat,
  maxSizeInMb = 5,
  children,
  isImgOnly = false,
}) => {
  const formik = useFormikContext();

  const handleChange = <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[]) => {
    if (!acceptedFiles.length) {
      toast.error(fileRejections[0].errors[0].message);
      return;
    }
    const currentFile = acceptedFiles[0];
    // TODO: To release an object URL, call revokeObjectURL().
    const fileUrl = URL.createObjectURL(currentFile);
    if (handleUpload) {
      handleUpload(currentFile);
    }
    // add preview to formik
    if (!formikValue) {
      return;
    }
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
    accept: isImgOnly ? 'image/*' : ['image/*', 'video/mp4', 'audio/mpeg'],
    validator: (file) => fileValidation(file, maxSizeInMb),
    onDrop: handleChange,
  });

  return (
    <div className={cn(className, !isButton ? styles.uploader : '')}>
      {isButton ? (
        <>
          <input {...getInputProps()} />
          <Button color={colorButton} className={styles.button} onClick={open} disabled={isLoading}>
            {children || 'Upload'}
          </Button>
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

export default Uploader;
