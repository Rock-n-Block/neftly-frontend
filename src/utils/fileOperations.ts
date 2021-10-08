import { FormikContextType } from 'formik/dist/types';

export type FileType = 'img' | 'cover';

export const checkValidFileType = (file: any, type: FileType) => {
  if (!file) {
    return false;
  }
  const isValidType =
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/svg' ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    file.type === 'image/gif' ||
    (type === 'img' && file.type === 'video/mp4') ||
    (type === 'img' && file.type === 'audio/mpeg');
  return isValidType;
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
