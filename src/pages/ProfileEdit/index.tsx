import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './ProfileEdit.module.scss';
import Control from '../../components/Control';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import Icon from '../../components/Icon';
import { useHistory } from 'react-router-dom';

import { observer } from 'mobx-react';
import { useMst } from '../../store/store';
import Button from '../../components/Button';
import { userApi } from '../../services/api';

const breadcrumbs = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Edit Profile',
  },
];

const ProfileEdit: React.FC = observer(() => {
  const history = useHistory();
  const { user } = useMst();
  const [avatarURL, setAvatarURL] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    avatar: '',
    display_name: '',
    custom_url: '',
    bio: '',
    site: '',
    twitter: '',
  });

  const handleChange = (key: string, value: any) => {
    if (key === 'avatar') {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setAvatarURL(typeof reader.result === 'string' ? reader.result : '');
      });
      reader.readAsDataURL(value);
    }
    if (key === 'custom_url') {
      setError(!Number.isNaN(+value) && value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newFormData = new FormData();
    if (typeof formData.avatar !== 'string')
      newFormData.append('avatar', formData.avatar, 'avatar');
    newFormData.append('display_name', formData.display_name);
    newFormData.append('custom_url', formData.custom_url);
    newFormData.append('bio', formData.bio);
    newFormData.append('site', formData.site);
    newFormData.append('twitter', formData.twitter);
    userApi
      .update(newFormData)
      .then(({ data }) => {
        user.update(data);
        history.push(`/profile/${user.id}`);
      })
      .catch((e) => console.log('Error', e))
      .finally(() => setLoading(false));
  };

  const handleClear = () => {
    setFormData((prevState) => ({
      ...prevState,
      avatar: '',
      display_name: '',
      custom_url: '',
      bio: '',
      site: '',
      twitter: '',
    }));
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      avatar: user.avatar || '',
      display_name: user.display_name || '',
      custom_url: user.custom_url || '',
      bio: user.bio || '',
      site: user.site || '',
      twitter: user.twitter || '',
    }));
  }, [user.avatar, user.display_name, user.custom_url, user.bio, user.site, user.twitter]);

  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Edit profile</h1>
            <div className={styles.info}>
              You can set preferred display name, create <strong>your profile URL</strong> and
              manage other personal settings.
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
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
                    <button
                      type="button"
                      className={cn('button-stroke button-small', styles.button)}
                    >
                      Upload
                    </button>
                    <input
                      className={styles.load}
                      type="file"
                      // eslint-disable-next-line
                      // @ts-ignore
                      onChange={(e) => handleChange('avatar', e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.list}>
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
                      prefix="ui8.net/"
                    />
                    <TextArea
                      className={styles.field}
                      label="Bio"
                      name="Bio"
                      placeholder="About yourselt in a few words"
                      onChange={(e) => handleChange('bio', e.target.value)}
                      value={formData.bio}
                      required
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Social</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="portfolio or website"
                      name="Portfolio"
                      type="text"
                      placeholder="Enter URL"
                      onChange={(e) => handleChange('site', e.target.value)}
                      value={formData.site}
                      required
                    />
                    <div className={styles.box}>
                      <TextInput
                        className={styles.field}
                        label="twitter"
                        name="Twitter"
                        type="text"
                        placeholder="twitter username"
                        onChange={(e) => handleChange('twitter', e.target.value)}
                        value={formData.twitter}
                        required
                        prefix="@"
                      />
                      <button
                        type="button"
                        className={cn('button-stroke button-small', styles.button)}
                      >
                        Verify account
                      </button>
                    </div>
                  </div>
                  <button type="button" className={cn('button-stroke button-small', styles.button)}>
                    <Icon name="plus-circle" size="16" />
                    <span>Add more social account</span>
                  </button>
                </div>
              </div>
              <div className={styles.note}>
                To update your settings you should sign message through your wallet. Click Update
                profile then sign the message
              </div>
              <div className={styles.btns}>
                <Button
                  onClick={handleSubmit}
                  className={cn('button', styles.button)}
                  disabled={error}
                  loading={isLoading}
                >
                  Update Profile
                </Button>
                <Button onClick={handleClear} className={styles.clear}>
                  <Icon name="circle-close" size="24" />
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileEdit;
