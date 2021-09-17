import React from 'react';
import { message, Upload } from 'antd';
import cn from 'classnames';
import { useFormikContext } from 'formik';

import styles from './Uploader.module.scss';

const { Dragger } = Upload;

interface IUploader {
  type: string;
  className?: string;
  // isLoading: boolean;
  setFormat?: (value: string) => void;
  name?: string;
  isButton?: boolean;
}

const Uploader: React.FC<IUploader> = ({
  type,
  className,
  // children,
  setFormat,
  name,
  isButton,
}) => {
  const formik = useFormikContext();
  // const [imageUrl, setImageUrl] = React.useState('');
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (type === 'img') formik.setFieldValue('preview', reader.result);
      if (type === 'cover') formik.setFieldValue('coverPreview', reader.result);
      callback(reader.result);
    });
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/gif' ||
      (type === 'img' && file.type === 'video/mp4') ||
      (type === 'img' && file.type === 'audio/mpeg');
    if (!isValidType) {
      message.error('You can only upload JPG/PNG/WEBP/GIF file!');
    }
    const isLt2M = file.size / 1024 / 1024 <= 30;
    if (!isLt2M) {
      message.error('Image must be smaller than 30MB!');
    }
    return isValidType && isLt2M;
  };
  const handleChange = ({ file }: any) => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/gif' ||
      (type === 'img' && file.type === 'video/mp4') ||
      (type === 'img' && file.type === 'audio/mpeg');
    if (!isValidType) {
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 30;
    if (!isLt2M) {
      return;
    }
    if (type === 'img' && setFormat) setFormat(file.type.slice(0, file.type.indexOf('/')));
    // if (handleUpload) {
    //   handleUpload(file.originFileObj);
    // } else {
    formik.setFieldValue(type, file.originFileObj);
    getBase64(file.originFileObj, () => {});
    // }
  };
  return (
    <div className={cn(className, !isButton ? styles.uploader : '')}>
      {isButton ? (
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleChange}
          multiple={false}
          showUploadList={false}
        >
          <button type="button" className={cn('button-stroke button-small', styles.button)}>
            Upload
          </button>
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

// import React from 'react';
// import { useFormikContext } from 'formik';

// import styles from './Uploader.module.scss';

// interface IUploader {
//   type: string;
//   handleUpload?: (file: any) => void;
//   className?: string;
//   isLoading?: boolean;
// }

// const Uploader: React.FC<IUploader> = ({ type, className, handleUpload }) => {
//   const formik = useFormikContext();
//   const [imageUrl, setImageUrl] = React.useState('');
//   const getBase64 = (img: any, callback: any) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//       formik.setFieldValue('preview', reader.result);
//       callback(reader.result);
//     });
//     reader.readAsDataURL(img);
//   };
//   const beforeUpload = (file: any) => {
//     const isValidType =
//       file.type === 'image/jpeg' ||
//       file.type === 'image/png' ||
//       file.type === 'image/webp' ||
//       file.type === 'image/gif';
//     if (!isValidType) {
//       // message.error('You can only upload JPG/PNG/WEBP/GIF file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 <= 30;
//     if (!isLt2M) {
//       // message.error('Image must be smaller than 30MB!');
//     }
//     return isValidType && isLt2M;
//   };
//   const handleChange = ({ file }: any) => {
//     beforeUpload(file);
//     const isValidType =
//       file.type === 'image/jpeg' ||
//       file.type === 'image/png' ||
//       file.type === 'image/webp' ||
//       file.type === 'image/gif';
//     if (!isValidType) {
//       return;
//     }
//     const isLt2M = file.size / 1024 / 1024 < 30;
//     if (!isLt2M) {
//       return;
//     }
//     if (handleUpload) {
//       handleUpload(file.originFileObj);
//     } else {
//       formik.setFieldValue(type, file.originFileObj);
//       getBase64(file.originFileObj, (url: any) => setImageUrl(url));
//     }
//   };
//   return (
//     <div className={`${className || ''} uploader`}>
//       <>
//         {imageUrl ? (
//           <img src={imageUrl} alt="" className="uploader__img" />
//         ) : (
//           <input
//             className={styles.load}
//             type="file"
//             // eslint-disable-next-line
//             // @ts-ignore
//             onChange={(e) => handleChange(e.target.files[0])}
//             required
//           />
//         )}
//       </>
//     </div>
//   );
// };

// export default Uploader;
