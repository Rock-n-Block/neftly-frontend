import React from 'react';
import { toast } from 'react-toastify';
import { withFormik } from 'formik';
import { observer } from 'mobx-react';
import * as Yup from 'yup';

import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';
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
    email: user.email || '',
    img: '',
    preview: `https://${user.avatar}` || '',
    isLoading: false,
  };
  const FormWithFormik = withFormik<any, IProfile>({
    enableReinitialize: true,
    mapPropsToValues: () => props,
    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
      customUrl: Yup.string().max(50, 'Too Long!'),
      bio: Yup.string().max(100),
      site: Yup.string().url(),
      twitter: Yup.string().max(50),
      instagram: Yup.string().max(50),
      facebook: Yup.string().max(50),
      email: Yup.string().email('Invalid email'),
    }),

    handleSubmit: (values, { setFieldValue, setFieldError }) => {
      setFieldValue('isLoading', true);
      const formData = new FormData();
      formData.append('avatar', values.img);
      formData.append('display_name', values.displayName || '');
      formData.append('bio', values.bio || '');
      formData.append('custom_url', values.customUrl || '');
      formData.append('site', values.site || '');
      formData.append('twitter', values.twitter || '');
      formData.append('instagram', values.instagram || '');
      formData.append('facebook', values.facebook || '');
      userApi
        .update(formData)
        .then(({ data }) => {
          toast.success('Verification request sent', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          user.update(data);
        })
        .catch(({ response }) => {
          if (response.data.custom_url) {
            setTimeout(() => {
              setFieldError('customUrl', response.data.custom_url);
            }, 100);
          }
        })
        .finally(() => {
          setFieldValue('isLoading', false);
        });
    },

    displayName: 'IProfile',
  })(Profile);
  return <FormWithFormik />;
};

export default observer(ProfileForm);
