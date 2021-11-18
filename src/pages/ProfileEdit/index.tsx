import { Control, H2, Text } from 'components';
import { observer } from 'mobx-react';

import styles from './ProfileEdit.module.scss';
import { ProfileForm } from 'forms';
import { FC } from 'react';
import { useMst } from 'store';
import { routes } from 'appConstants';

const ProfileEdit: FC = observer(() => {
  const { user } = useMst();

  const breadcrumbs = [
    {
      title: 'My profile',
      url: routes.profile.link(user.id),
    },
    {
      title: 'Edit Profile',
    },
  ];

  return (
    <div className={styles.profileEdit}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={styles.top}>
        <H2 className={styles.title} align="center">
          Edit profile
        </H2>
        <Text className={styles.info} color="gray" weight="medium" size="m" align="center">
          You can set preferred display name, create your profile URL and manage other personal
          settings.
        </Text>
      </div>
      <ProfileForm />
    </div>
  );
});

export default ProfileEdit;
