export const checkValidFileType = (file: any, type: 'img' | 'cover') => {
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
