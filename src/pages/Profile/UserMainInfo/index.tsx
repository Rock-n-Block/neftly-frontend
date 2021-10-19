import React, { useCallback, useState } from 'react';
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
import { useFetchUser, useFollow } from 'hooks';
import { zeroAddress } from 'appConstants';
import { sliceString } from 'utils';

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

  const handleFileUpload = useCallback(
    (file: any) => {
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
    },
    [user],
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(user.address);
    toast.info('Copied to Clipboard');
  }, [user.address]);

  return (
    <section
      className={s.user}
      style={{
        backgroundImage: `url(${user.cover || shownUser.cover || profile_page_bg_example})`,
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
        <div
          className={s.user_info__icon}
          onClick={handleCopy}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          <img src={LinkIcon} alt="link" />
        </div>
        <Text size="m">{sliceString(shownUser.address || zeroAddress)}</Text>
      </div>
      <div className={s.user_buttons}>
        {isSelf ? (
          <>
            <Uploader
              type="cover"
              isButton
              handleUpload={handleFileUpload}
              isLoading={isFileLoading}
            >
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
