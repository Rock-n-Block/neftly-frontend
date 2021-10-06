import React from 'react';
import { Button, H2, Uploader } from 'components';

import { ReactComponent as GeoIcon } from '../../../assets/img/ProfilePage/geo_icon.svg';
import { ReactComponent as LinkIcon } from '../../../assets/img/ProfilePage/link_icon.svg';
import profile_avatar_example from '../../../assets/img/ProfilePage/profile_avatar_example.png';
import profile_page_bg_example from '../../../assets/img/ProfilePage/profile_page_bg_example.png';

import s from './UserMainInfo.module.scss';

interface IUserMainInfo {
  handleUpload: (file: any) => void;
  isLoading: boolean;
  cover?: string;
  avatar?: string;
}

const UserMainInfo: React.FC<IUserMainInfo> = ({ handleUpload, isLoading, cover, avatar }) => {
  return (
    <section
      className={s.user}
      style={{
        background: `url(${cover || profile_page_bg_example}) center center no-repeat`,
      }}
    >
      <div className={s.user_avatar}>
        <img src={avatar || profile_avatar_example} alt="profile_avatar_example" />
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
        <Uploader type="img" isButton handleUpload={handleUpload} isLoading={isLoading}>
          <Button className={s.user_button} color="outline" icon="pencil" loading={isLoading}>
            Edit Banner
          </Button>
        </Uploader>
        <Button className={s.user_button} color="outline" icon="edit" href="/profile/edit">
          Edit Profile
        </Button>
      </div>
    </section>
  );
};

export default UserMainInfo;
