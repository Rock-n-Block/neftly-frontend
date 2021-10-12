// eslint-disable-next-line import/no-unresolved
import { FormikContextType } from 'formik/dist/types';

export type FileType = 'img' | 'cover';

export const checkValidFileType = (fileType: string, type: FileType) => {
  if (!fileType) {
    return false;
  }
  const isValidType =
    fileType === 'image/jpeg' ||
    fileType === 'image/jpg' ||
    fileType === 'image/svg' ||
    fileType === 'image/svg+xml' ||
    fileType === 'image/png' ||
    fileType === 'image/webp' ||
    fileType === 'image/gif' ||
    (type === 'img' && fileType === 'video/mp4') ||
    (type === 'img' && fileType === 'audio/mpeg');
  return isValidType;
};
export const checkValidFileSize = (fileSize: number, maxSize: number) => {
  if (!fileSize) {
    return false;
  }
  const isValidSize = fileSize / 1024 / 1024 <= maxSize;

  return isValidSize;
};

export const getBase64 = (
  img: any,
  type: FileType,
  callback: any,
  formik: FormikContextType<any>,
) => {
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
};

export const beforeUpload = (file: any, type: FileType, maxSize: number, message: any) => {
  const isValidType = checkValidFileType(file.type, type);
  const isValidSize = checkValidFileSize(file.size, maxSize);

  if (!isValidType) {
    message.error('You can only upload JPG/PNG/WEBP/GIF file!');
  }
  if (!isValidSize) {
    message.error(`Image must be smaller than ${maxSize}MB!`);
  }
  return isValidType && isValidSize;
};
