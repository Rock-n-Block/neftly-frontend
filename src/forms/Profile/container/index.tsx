import React from 'react';
import { toast } from 'react-toastify';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';
import { userApi } from 'services/api';
import { useMst } from 'store';
import * as Yup from 'yup';

import Profile, { IProfile } from '../component';

const ProfileForm: React.FC = () => {
  const { user } = useMst();

  const props: IProfile = {
    displayName: user.display_name || '',
    customUrl: user.custom_url || '',
    bio: user.bio || '',
    site: user.site || '',
    twitter: user.twitter || '',
    instagram: user.instagram || '',
    facebook: user.facebook || '',
    avatar: '',
    preview: `https://${user.avatar}` || '',
    isLoading: false,
  };
  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
      customUrl: Yup.string().max(50, 'Too Long!'),
      bio: Yup.string().max(1000),
      site: Yup.string().url(),
      twitter: Yup.string().max(50),
      instagram: Yup.string().max(50),
      facebook: Yup.string().max(50),
    }),

    handleSubmit: (values, { setFieldValue, setFieldError, setSubmitting }) => {
      setFieldValue('isLoading', true);
      const formData = new FormData();
      formData.append('avatar', values.avatar || '');
      formData.append('display_name', values.displayName || '');
      formData.append('bio', values.bio || '');
      formData.append('custom_url', values.customUrl || '');
      formData.append('site', values.site || '');
      formData.append('twitter', values.twitter || '');
      formData.append('instagram', values.instagram || '');
      formData.append('facebook', values.facebook || '');
      // formData.append('email', values.email || '');
      userApi
        .update(formData)
        .then(({ data }) => {
          toast.success('Profile updated');
          user.update(data);
        })
        .catch(({ response }) => {
          toast.error('Profile update failed');
          if (response.data.custom_url) {
            setTimeout(() => {
              setFieldError('customUrl', response.data.custom_url);
            }, 100);
          }
        })
        .finally(() => {
          setFieldValue('isLoading', false);
          setSubmitting(false);
        });
    },

    displayName: 'IProfile',
  })(Profile);
  return <FormWithFormik />;
};

export default observer(ProfileForm);
