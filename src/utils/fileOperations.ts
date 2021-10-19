import { FileError } from 'react-dropzone';

export type FileType = 'img' | 'cover';

export const isValidFileType = (fileType: string) => {
  const isValidType =
    fileType === 'image/jpeg' ||
    fileType === 'image/jpg' ||
    fileType === 'image/svg' ||
    fileType === 'image/svg+xml' ||
    fileType === 'image/png' ||
    fileType === 'image/webp' ||
    fileType === 'image/gif' ||
    fileType === 'video/mp4' ||
    fileType === 'audio/mpeg';

  // (type === 'img' && fileType === 'video/mp4') ||
  // (type === 'img' && fileType === 'audio/mpeg');
  return isValidType;
};
export const isValidFileSize = (fileSize: number, maxSize: number) => {
  // if (!fileSize) {
  //   return false;
  // }
  const maxFileSizeInBytes = maxSize * 1024 * 1024;

  const isValidSize = fileSize <= maxFileSizeInBytes;

  return isValidSize;
};

export const fileValidation = (file: File, maxSizeInMb: number): FileError | FileError[] | null => {
  if (!isValidFileType(file.type)) {
    return {
      code: 'invalid-file-type',
      message: `File type must be `,
    };
  }
  if (!isValidFileSize(file.size, maxSizeInMb)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${maxSizeInMb} mb`,
    };
  }
  return null;
};
