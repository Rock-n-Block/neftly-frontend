import React, { useState } from 'react';
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
import { useMst } from 'store';
import { observer } from 'mobx-react-lite';
import { userApi } from 'services';
import { toast } from 'react-toastify';
// import { useHistory } from 'react-router';
import { zeroAddress } from 'appConstants';
import { useFetchUser } from '../../../hooks/useFetchUser';
import { useFollow } from '../../../hooks';

interface IProps {
  userId: string;
  setCurrentUser: any;
}

const UserMainInfo: React.FC<IProps> = observer(({ userId, setCurrentUser }) => {
  const { user } = useMst();
  // TODO: handle user load
  const [, setIsUserLoading] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isFollowClickPending, setIsFollowClickPending] = useState(false);
  const {
    user: shownUser,
    isSelf,
    isFollowed,
    setIsFollowed,
  } = useFetchUser({
    id: userId,
    setLoading: setIsUserLoading,
    successCallback: setCurrentUser,
  });
  const { handleFollowClick } = useFollow({
    setLoading: setIsFollowClickPending,
    id: userId,
    initialState: isFollowed,
    successCallback: setIsFollowed,
  });
  /* const handleFollowClick = useCallback(() => {
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
  }, [isFollowed, setIsFollowed, shownUser.id]); */

  const handleFileUpload = (file: any) => {
    setIsFileLoading(true);
    const fileData = new FormData();
    fileData.append('cover', file);
    userApi
      .setUserCover(fileData)
      .then(({ data }) => {
        toast.success('Cover uploaded');
        user.setCover(data);
      })
      .catch((err) => {
        toast.error('Success unfollow');
        console.log(err, 'set cover');
      })
      .finally(() => {
        setIsFileLoading(false);
      });
  };

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
        <Text size="m">{shownUser.address || zeroAddress}</Text>
      </div>
      <div className={s.user_buttons}>
        {isSelf ? (
          <>
            <Uploader type="img" isButton handleUpload={handleFileUpload} isLoading={isFileLoading}>
              <Button className={s.user_button} color="outline" loading={isFileLoading}>
                <img src={iconEdit} alt="" />
                <Text tag="span">Edit Banner</Text>
              </Button>
            </Uploader>
            <Button className={s.user_button} color="outline" href="/profile/edit">
              <img src={iconSettings} alt="" />
              <Text tag="span">Edit Profile</Text>
            </Button>
          </>
        ) : (
          <Button
            className={s.user_button}
            color="blue"
            onClick={handleFollowClick}
            disabled={isFollowClickPending}
          >
            <img src={iconAddBlack} alt="" />
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </section>
  );
});

export default UserMainInfo;
