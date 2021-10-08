import React from 'react';
import { Button, H2, Uploader, Text } from 'components';

import {
  iconAddBlack,
  iconEdit,
  iconSettings,
  LinkIcon,
  profile_avatar_example,
  profile_page_bg_example,
} from 'assets/img';

import s from './UserMainInfo.module.scss';
import { IExtendedInfo } from 'typings';
import { useMst } from 'store';
import { observer } from 'mobx-react-lite';

interface IUserMainInfo {
  handleUpload: (file: any) => void;
  isLoading: boolean;
  shownUser: IExtendedInfo;
}

const UserMainInfo: React.FC<IUserMainInfo> = observer(({ handleUpload, isLoading, shownUser }) => {
  const { user } = useMst();
  const isSelf = shownUser.id.toString() === user.id.toString();
  return (
    <section
      className={s.user}
      style={{
        backgroundImage: `url(${shownUser.cover || profile_page_bg_example})`,
      }}
    >
      <div className={s.user_avatar}>
        <img
          src={shownUser.avatar || profile_avatar_example}
          alt="profile_avatar_example"
          width={130}
          height={130}
        />
      </div>
      <H2 className={s.user_name}>{shownUser.display_name || 'User Name'}</H2>
      <div className={s.user_info}>
        <div className={s.user_info__icon}>
          <img src={LinkIcon} alt="link" />
        </div>
        <Text size="m">{shownUser.address || '0x0000000000000000000000000000000000000000'}</Text>
      </div>
      <div className={s.user_buttons}>
        {isSelf ? (
          <>
            <Uploader type="img" isButton handleUpload={handleUpload} isLoading={isLoading}>
              <Button className={s.user_button} color="outline" loading={isLoading}>
                <img src={iconEdit} alt="" />
                <Text tag="span">Edit Banner</Text>
              </Button>
            </Uploader>
            <Button className={s.user_button} color="outline" href="/profile/edit">
              <img src={iconSettings} alt="" />
              Edit Profile
            </Button>
          </>
        ) : (
          <Button className={s.user_button} color="blue" href="/profile/edit">
            <img src={iconAddBlack} alt="" />
            Follow
          </Button>
        )}
      </div>
    </section>
  );
});

export default UserMainInfo;
