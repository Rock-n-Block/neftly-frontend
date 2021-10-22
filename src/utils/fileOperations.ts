import { FileError } from 'react-dropzone';

export const isValidFileSize = (fileSize: number, maxSize: number): boolean => {
  const maxFileSizeInBytes = maxSize * 1024 * 1024;

  const isValidSize = fileSize <= maxFileSizeInBytes;

  return isValidSize;
};

export const fileValidation = (file: File, maxSizeInMb: number): FileError | FileError[] | null => {
  /* if (!isValidFileType(file.type)) {
    return {
      code: 'invalid-file-type',
      message: `File type must be `,
    };
  }*/
  if (!isValidFileSize(file.size, maxSizeInMb)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${maxSizeInMb} mb`,
    };
  }
  return null;
};
