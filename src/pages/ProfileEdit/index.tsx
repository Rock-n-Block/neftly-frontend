// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import cn from 'classnames';
// import { Button, Control, Text, TextArea, TextInput } from 'components';
import { Control } from 'components';
import { observer } from 'mobx-react';

// import { userApi } from '../../services/api';
// import { useMst } from '../../store/store';

import styles from './ProfileEdit.module.scss';
import { ProfileForm } from 'forms';

const breadcrumbs = [
  {
    title: 'My profile',
    url: '/profile',
  },
  {
    title: 'Edit Profile',
  },
];

const ProfileEdit: React.FC = observer(() => {
  // const history = useHistory();
  // const { user } = useMst();
  // const [avatarURL, setAvatarURL] = useState('');
  // const [error, setError] = useState(false);
  // const [isLoading, setLoading] = useState<boolean>(false);

  // const [formData, setFormData] = useState({
  //   avatar: '',
  //   display_name: '',
  //   email: '',
  //   custom_url: '',
  //   bio: '',
  //   instagram: '',
  //   twitter: '',
  //   facebook: '',
  //   site: '',
  // });

  // const handleChange = (key: string, value: any) => {
  //   if (key === 'avatar') {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       setAvatarURL(typeof reader.result === 'string' ? reader.result : '');
  //     });
  //     reader.readAsDataURL(value);
  //   }
  //   if (key === 'custom_url') {
  //     setError(!Number.isNaN(+value) && value);
  //   }
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   const newFormData = new FormData();
  //   if (typeof formData.avatar !== 'string')
  //     newFormData.append('avatar', formData.avatar, 'avatar');
  //   newFormData.append('display_name', formData.display_name);
  //   newFormData.append('custom_url', formData.custom_url);
  //   newFormData.append('email', formData.email);
  //   newFormData.append('bio', formData.bio);
  //   newFormData.append('instagram', formData.instagram);
  //   newFormData.append('twitter', formData.twitter);
  //   newFormData.append('facebook', formData.facebook);
  //   newFormData.append('site', formData.site);
  //   userApi
  //     .update(newFormData)
  //     .then(({ data }) => {
  //       user.update(data);
  //       history.push(`/profile/${user.id}`);
  //     })
  //     .catch((e) => console.log('Error', e))
  //     .finally(() => setLoading(false));
  // };

  /* const handleClear = () => {
    setFormData((prevState) => ({
      ...prevState,
      avatar: '',
      display_name: '',
      custom_url: '',
      bio: '',
      email: '',
      instagram: '',
      twitter: '',
      facebook: '',
      site: '',
    }));
  }; */

  // useEffect(() => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     avatar: user.avatar || '',
  //     display_name: user.display_name || '',
  //     custom_url: user.custom_url || '',
  //     email: user.email || '',
  //     bio: user.bio || '',
  //     instagram: user.instagram || '',
  //     twitter: user.twitter || '',
  //     facebook: user.facebook || '',
  //     site: user.site || '',
  //   }));
  // }, [
  //   user.avatar,
  //   user.display_name,
  //   user.custom_url,
  //   user.bio,
  //   user.site,
  //   user.twitter,
  //   user.email,
  //   user.instagram,
  //   user.facebook,
  // ]);

  return (
    <div className={styles.profileEdit}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={styles.top}>
        <h1 className={cn('h2', styles.title)}>Edit profile</h1>
        <div className={styles.info}>
          You can set preferred display name, create your profile URL and manage other personal
          settings.
        </div>
      </div>
      <ProfileForm />
      {/* <div className={cn('container', styles.container)}>
        <div className={styles.row}>
          <div className={cn(styles.col, styles.left)}>
            <div className={styles.user}>
              <div className={styles.avatar}>
                <img
                  src={avatarURL || user.avatar || '/images/content/avatar-user.jpg'}
                  alt="Avatar"
                />
              </div>
              <div className={styles.details}>
                <div className={styles.stage}>Profile photo</div>
                <div className={styles.text}>
                  We recommend an image of at least 400x400. Gifs work too{' '}
                  <span role="img" aria-label="hooray">
                      🙌
                    </span>
                </div>
                <div className={styles.file}>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.category}>Account info</div>
              <div className={styles.fieldset}>
                <TextInput
                  className={styles.field}
                  label="display name"
                  name="Name"
                  type="text"
                  placeholder="Enter your display name"
                  onChange={(e) => handleChange('display_name', e.target.value)}
                  value={formData.display_name}
                  required
                  icon="search"
                />
                <TextInput
                  className={cn(styles.field, error ? styles.error : '')}
                  label={error ? 'URL cannot consist only of numbers ' : 'Custom url'}
                  name="Url"
                  type="text"
                  placeholder="Your custom URL"
                  required
                  onChange={(e) => handleChange('custom_url', e.target.value)}
                  value={formData.custom_url}
                  prefix="site.net/"
                />
                <TextInput
                  className={cn(styles.field, error ? styles.error : '')}
                  label={error ? '' : 'Email'}
                  name="email"
                  type="text"
                  placeholder="Add your email here"
                  required
                  onChange={(e) => handleChange('email', e.target.value)}
                  value={formData.email}
                />
                <TextArea
                  className={styles.field}
                  label="Bio"
                  name="Bio"
                  placeholder="About yourselt in a few words"
                  onChange={(e) => handleChange('bio', e.target.value)}
                  value={formData.bio}
                  required
                  editable
                  maxLettersCount={100}
                />
              </div>
            </div>
          </div>
          <div className={cn(styles.col, styles.right)}>
            <div className={styles.item}>
              <div className={styles.category}>Social Account</div>
              <div className={styles.fieldset}>
                <TextInput
                  className={styles.field}
                  label="instagram"
                  name="Instagram"
                  type="text"
                  placeholder="Enter URL"
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  value={formData.instagram}
                  required
                />
                <TextInput
                  className={styles.field}
                  label="twitter"
                  name="Twitter"
                  type="text"
                  placeholder="Enter URL"
                  onChange={(e) => handleChange('twitter', e.target.value)}
                  value={formData.twitter}
                  required
                />
                <TextInput
                  className={styles.field}
                  label="facebook"
                  name="Facebook"
                  type="text"
                  placeholder="Enter URL"
                  onChange={(e) => handleChange('facebook', e.target.value)}
                  value={formData.facebook}
                  required
                />
                <TextInput
                  className={styles.field}
                  label="Website"
                  name="Website"
                  type="text"
                  placeholder="Enter URL"
                  onChange={(e) => handleChange('site', e.target.value)}
                  value={formData.site}
                  required
                />
              </div>
              <Button
                onClick={handleSubmit}
                className={cn('button', styles.submitButton)}
                disabled={error}
                loading={isLoading}
                color="blue"
              >
                <Text size="m" color="black" weight="bold">Update Profile</Text>
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
});

export default ProfileEdit;
