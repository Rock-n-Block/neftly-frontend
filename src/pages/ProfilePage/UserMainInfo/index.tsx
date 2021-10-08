import React, { useCallback, useEffect, useState } from 'react';
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
import { userApi } from 'services';
import { toast } from 'react-toastify';

interface IUserMainInfo {
  handleUpload: (file: any) => void;
  isLoading: boolean;
  shownUser: IExtendedInfo;
}

const UserMainInfo: React.FC<IUserMainInfo> = observer(({ handleUpload, isLoading, shownUser }) => {
  const { user } = useMst();
  const isSelf = shownUser.id.toString() === user.id.toString();
  const [isFollowed, setIsFollowed] = useState(false);
  const findIsFollowed = useCallback(() => {
    return !!shownUser.followers.find((follower) => follower.id.toString() === user.id.toString());
  }, [shownUser.followers, user.id]);
  const handleFollowClick = useCallback(() => {
    if (isFollowed) {
      userApi
        .unfollow({ id: shownUser.id })
        .then(() => {
          toast.success('Success unfollow');
          setIsFollowed(false);
        })
        .catch((error) => {
          toast.error('Error when unfollow');
          console.log(error);
        });
    } else {
      userApi
        .follow({ id: shownUser.id })
        .then(() => {
          toast.success('Success follow');
          setIsFollowed(true);
        })
        .catch((error) => {
          toast.error('Error when follow');
          console.log(error);
        });
    }
  }, [isFollowed, shownUser.id]);

  useEffect(() => {
    if (!user.id) {
      return;
    }
    setIsFollowed(findIsFollowed());
  }, [findIsFollowed, user.id]);

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
        {isSelf && (
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
        )}
        {!isSelf && (
          <Button className={s.user_button} color="blue" onClick={handleFollowClick}>
            <img src={iconAddBlack} alt="" />
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </section>
  );
});

export default UserMainInfo;
