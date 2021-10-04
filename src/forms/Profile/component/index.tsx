import React from 'react';
import { Form } from 'antd';
import cn from 'classnames';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';

import Button from '../../../components/Button';
import TextArea from '../../../components/TextArea';
import TextInput from '../../../components/TextInput';
import Uploader from '../../../components/Uploader';
// import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
import { validateField } from '../../../utils/validate';

import styles from './ProfileEdit.module.scss';
import { Text } from 'components';

export interface IProfile {
  displayName?: string;
  customUrl?: string;
  bio?: string;
  site?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  img?: any;
  preview?: string;
  isLoading: boolean;
}

const Profile: React.FC<FormikProps<IProfile>> = observer(
  ({ touched, errors, handleChange, handleBlur, values, handleSubmit }) => {
    // const { t } = useTranslation();
    const { user } = useMst();

    // const verifyUser = useCallback(() => {
    //   userApi
    //     .verifyMe(values, user.address)
    //     .then()
    //     .catch(({ response }) => notification.error({ message: response.data.error }));
    // }, [values, user.address]);

    // const onSubmit = () => {
    // handleSubmit();
    // };
    return (
      <Form name="form-profile" layout="vertical" className={cn('container', styles.container)}>
        <div className={styles.row}>
          <div className={cn(styles.col, styles.left)}>
            <div className={styles.col}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  {values.img ? (
                    <img alt="" src={values.preview} />
                  ) : (
                    <img src={user.avatar || '/images/content/avatar-user.jpg'} alt="Avatar" />
                  )}
                </div>
                <div className={styles.details}>
                  <div className={styles.stage}>Profile photo</div>
                  <div className={styles.text}>
                    We recommend an image of at least 400x400. Gifs work too{' '}
                    <span role="img" aria-label="hooray">
                      🙌
                    </span>
                  </div>
                  <div>
                    <Form.Item
                      name="img"
                      validateStatus={validateField('img', touched, errors)}
                      help={!touched.img ? false : errors.img}
                      // required
                    >
                      <Uploader type="img" isButton className={styles.fileUpload} />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.category}>Account info</div>
              <div className={styles.fieldset}>
                <Form.Item
                  name="displayName"
                  className={styles.field}
                  initialValue={values.displayName}
                >
                  <div>
                    <TextInput
                      label="display name"
                      name="displayName"
                      type="text"
                      // required
                      value={values.displayName}
                      placeholder="Enter your display name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      icon="search"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="customUrl"
                  className={styles.field}
                  initialValue={values.customUrl}
                  validateStatus={validateField('customUrl', touched, errors)}
                  help={!touched.customUrl ? false : errors.customUrl}
                >
                  <div>
                    <TextInput
                      name="customUrl"
                      label="Custom url"
                      value={values.customUrl}
                      type="text"
                      placeholder="Your custom URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix="site.net/"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="email" className={styles.field} initialValue={values.email}
                  help={!touched.email ? false : errors.email}>
                  <div>
                    <TextInput
                      name="email"
                      label="email"
                      type="text"
                      value={values.email}
                      placeholder="Add your email here"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </Form.Item>
                <Form.Item name="bio" className={styles.field} initialValue={values.bio}
                  help={!touched.bio ? false : errors.bio}>
                  <div>
                    <TextArea
                      label="Bio"
                      name="bio"
                      value={values.bio}
                      placeholder="About yourselt in a few words"
                      onChange={handleChange}
                      // required
                      editable
                      maxLettersCount={100}
                    />
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={cn(styles.col, styles.right)}>
            <div className={styles.item}>
              <div className={styles.category}>Social Account</div>
              <div className={styles.fieldset}>
                <Form.Item
                  name="instagram"
                  className={styles.field}
                  initialValue={values.instagram}
                >
                  <div>
                    <TextInput
                      name="instagram"
                      label="instagram"
                      type="text"
                      value={values.instagram}
                      placeholder="Enter URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix="@"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="twitter" className={styles.field} initialValue={values.twitter}>
                  <div>
                    <TextInput
                      name="twitter"
                      label="twitter"
                      type="text"
                      value={values.twitter}
                      placeholder="Enter URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix="@"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="facebook" className={styles.field} initialValue={values.facebook}>
                  <div>
                    <TextInput
                      name="facebook"
                      label="facebook"
                      type="text"
                      value={values.facebook}
                      placeholder="Enter URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      prefix="@"
                    />
                  </div>
                </Form.Item>
                <Form.Item name="site" className={styles.field} initialValue={values.site}>
                  <div>
                    <TextInput
                      label="website"
                      placeholder="Enter URL"
                      name="site"
                      type="text"
                      value={values.site}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </Form.Item>
              </div>
              <Button
                onClick={() => handleSubmit()}
                className={cn('button', styles.submitButton)}
                loading={values.isLoading}
                color="blue"
              >
                <Text size="m" color="black" weight="bold">
                  Update Profile
                </Text>
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  },
);

export default Profile;
