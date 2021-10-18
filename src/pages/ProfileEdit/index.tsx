import cn from 'classnames';
import { Control } from 'components';
import { observer } from 'mobx-react';

import styles from './ProfileEdit.module.scss';
import { ProfileForm } from 'forms';
import { FC } from 'react';

const breadcrumbs = [
  {
    title: 'My profile',
    url: '/profile',
  },
  {
    title: 'Edit Profile',
  },
];

const ProfileEdit: FC = observer(() => {
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
    </div>
  );
});

export default ProfileEdit;
