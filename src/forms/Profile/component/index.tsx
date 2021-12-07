import { FC, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Button, H5, Text, TextArea, TextInput, Uploader } from 'components';
import { Field, FieldProps, Form, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { useMst } from 'store';

import styles from './ProfileEdit.module.scss';

export interface IProfile {
  displayName?: string;
  customUrl?: string;
  bio?: string;
  site?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  // email?: string;
  avatar?: any;
  preview?: string;
  isLoading: boolean;
}

const Profile: FC<FormikProps<IProfile>> = observer(
  ({ touched, errors, handleChange, handleBlur, values, handleSubmit }: any) => {
    const { user } = useMst();
    return (
      <Form name="form-profile" className={styles.container}>
        <div className={styles.row}>
          <div className={cn(styles.col, styles.left)}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                {values.avatar ? (
                  <img alt="" src={values.preview} />
                ) : (
                  <img src={user.avatar || '/images/content/avatar-user.jpg'} alt="Avatar" />
                )}
              </div>
              <div className={styles.details}>
                <H5 className={styles.stage}>Profile photo</H5>
                <Text color="gray" className={styles.fileInfo}>
                  We recommend an image of at least 400x400. Gifs work too{' '}
                  <span role="img" aria-label="hooray">
                    🙌
                  </span>
                </Text>
                <Field
                  id="avatar"
                  name="avatar"
                  render={() => (
                    <Uploader
                      isImgOnly
                      formikValue="avatar"
                      isButton
                      colorButton='black'
                      className={styles.fileUpload}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.item}>
              <Text size="xl" className={styles.category}>
                Account info
              </Text>
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
                  <Text color="red">
                    Display name should be more than 2 and less than 50 symbols
                  </Text>
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
                      prefix="lessnft.com/"
                    />
                  )}
                />
                <Field
                  id="bio"
                  name="bio"
                  render={({ form: { isSubmitting } }: FieldProps) => (
                    <TextArea
                      name="bio"
                      className={styles.field}
                      label="Bio"
                      disabled={isSubmitting}
                      value={values.bio}
                      onChange={handleChange}
                      placeholder="About yourselt in a few words"
                      maxLettersCount={1000}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className={cn(styles.col, styles.right)}>
            <div className={styles.item}>
              <Text size="xl" className={styles.category}>
                Social Account
              </Text>
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
                {errors.site && touched.site && <Text color="red">Invalid URL</Text>}
              </div>
              <Button
                onClick={() => handleSubmit()}
                className={cn('button', styles.submitButton)}
                loading={values.isLoading}
                color="purple"
                type="submit"
              >
                <Text size="m" color="white" weight="bold">
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
