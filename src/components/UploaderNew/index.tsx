import { FileError, FileWithPath, useDropzone } from 'react-dropzone';
import styles from './Uploader.module.scss';
import cn from 'classnames';
import { FC } from 'react';
import { Button } from 'components';
import { isValidFileSize, isValidFileType } from 'utils';
import { useFormikContext } from 'formik';

// import { useFormikContext } from 'formik';

interface IProps {
  isLoading?: boolean;
  handleUpload?: (value: string) => void;
  className?: string;
  isButton: boolean;
  formikValue: string;
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

const MAX_FILE_SIZE = 10;

const fileValidation = (file: File): FileError | FileError[] | null => {
  if (!isValidFileType(file.type)) {
    return {
      code: 'invalid-file-type',
      message: `File type must be `,
    };
  }
  if (!isValidFileSize(file.size, MAX_FILE_SIZE)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${MAX_FILE_SIZE} mb`,
    };
  }
  return null;
};

const UploaderNew: FC<IProps> = ({
  className,
  // handleUpload,
  formikValue,
  isButton = false,
  isLoading,
  children,
}) => {
  const formik = useFormikContext();

  console.log(isLoading);
  const handleChange = <T extends File>(acceptedFiles: T[]) => {
    const currentFile = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(currentFile);
    // add preview to formik
    formik.setFieldValue('preview', fileUrl);
    formik.setFieldValue(formikValue, currentFile);
  };
  const { getRootProps, fileRejections, getInputProps, open } = useDropzone({
    validator: fileValidation,
    onDrop: handleChange,
  });

  //Error handling
  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    ),
  );

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
          <p>Drag n drop some files here</p>
        </div>
      )}
      <ul>{fileRejectionItems}</ul>
    </div>
  );
};

export default UploaderNew;
