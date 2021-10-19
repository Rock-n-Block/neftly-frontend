import { Control, H2, Text } from 'components';
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
        <H2 className={styles.title} align="center">
          Edit profile
        </H2>
        <Text className={styles.info} color="lightGray" weight="medium" size="m" align="center">
          You can set preferred display name, create your profile URL and manage other personal
          settings.
        </Text>
      </div>
      <ProfileForm />
    </div>
  );
});

export default ProfileEdit;
