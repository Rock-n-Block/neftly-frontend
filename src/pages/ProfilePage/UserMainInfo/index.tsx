import React from 'react';

import { H2, Button } from 'components';

import s from './UserMainInfo.module.scss';

import profile_avatar_example from '../../../assets/img/ProfilePage/profile_avatar_example.png';
import { ReactComponent as LinkIcon } from '../../../assets/img/ProfilePage/link_icon.svg';
import { ReactComponent as GeoIcon } from '../../../assets/img/ProfilePage/geo_icon.svg';

const UserMainInfo: React.FC = () => {
  return (
    <section className={s.user}>
      <div className={s.user_avatar}>
        <img src={profile_avatar_example} alt="profile_avatar_example" />
      </div>
      <H2 className={s.user_name}>Bruno Bangnyfe</H2>
      <div className={s.user_info}>
        <div className={s.user_info__icon}>
          <LinkIcon />
        </div>
        <div className={s.user_info__value}>0xc4c16a645i84fbuqb21a</div>
      </div>
      <div className={s.user_info}>
        <div className={s.user_info__icon}>
          <GeoIcon />
        </div>
        <div className={s.user_info__value}>Buenos Aires, Argentine</div>
      </div>
      <div className={s.user_buttons}>
        <Button className={s.user_button} color="outline" icon="pencil">
          Edit Banner
        </Button>
        <Button className={s.user_button} color="outline" icon="edit" href="/profile/edit">
          Edit Profile
        </Button>
      </div>
    </section>
  );
};

export default UserMainInfo;
