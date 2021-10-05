import React, { SyntheticEvent } from 'react';
import { Form } from 'antd';
import cn from 'classnames';
import { Button, Text, TextArea, TextInput, Uploader, WhitelistError } from 'components';
import { FormikProps, Field, FieldProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store/store';
import { validateField } from 'utils/validate';

import styles from './ProfileEdit.module.scss';

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
  ({ touched, errors, handleChange, handleBlur, values, handleSubmit }: any) => {
    const { user } = useMst();
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
                <Field
                  id="displayName"
                  name="displayName"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="displayName"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="display name"
                      value={values.displayName}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Enter your display name"
                    />
                  )}
                />
                {errors.displayName && touched.displayName && (
                  <WhitelistError body="Display name should be more than 2 and less than 50 symbols" />
                )}

                <Field
                  id="customUrl"
                  name="customUrl"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="customUrl"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="Custom url"
                      value={values.customUrl}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Your custom URL"
                      prefix="site.net/"
                    />
                  )}
                />
                <Field
                  id="email"
                  name="email"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="email"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Add your email here"
                    />
                  )}
                />
                {errors.email && touched.email && <WhitelistError body="Invalid email" />}

                <Field
                  id="bio"
                  name="bio"
                  render={() => (
                    <TextArea
                      name="bio"
                      className={styles.field}
                      label="Bio"
                      value={values.bio}
                      onChange={handleChange}
                      placeholder="About yourselt in a few words"
                      editable
                      maxLettersCount={100}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className={cn(styles.col, styles.right)}>
            <div className={styles.item}>
              <div className={styles.category}>Social Account</div>
              <div className={styles.fieldset}>
                <Field
                  id="instagram"
                  name="instagram"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="instagram"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="instagram"
                      value={values.instagram}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Enter URL"
                      prefix="@"
                    />
                  )}
                />
                <Field
                  id="twitter"
                  name="twitter"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="twitter"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="twitter"
                      value={values.twitter}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Enter URL"
                      prefix="@"
                    />
                  )}
                />
                <Field
                  id="facebook"
                  name="facebook"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="facebook"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="facebook"
                      value={values.facebook}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Enter URL"
                      prefix="@"
                    />
                  )}
                />
                <Field
                  id="site"
                  name="site"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextInput
                      name="site"
                      className={styles.field}
                      disabled={isSubmitting}
                      label="website"
                      value={values.site}
                      onChange={handleChange}
                      onBlur={(e: SyntheticEvent) => handleBlur(e)}
                      type="text"
                      placeholder="Enter URL"
                    />
                  )}
                />
                {errors.site && touched.site && <WhitelistError body="Invalid URL" />}
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
