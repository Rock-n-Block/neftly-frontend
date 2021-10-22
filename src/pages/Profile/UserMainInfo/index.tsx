import { FC, useCallback, useState } from 'react';
import { Button, Copyable, H2, Text, Uploader } from 'components';

import {
  iconAddBlack,
  iconEdit,
  iconSettings,
  profile_avatar_example,
  profile_page_bg_example,
} from 'assets/img';

import s from './UserMainInfo.module.scss';
import { useMst } from 'store';
import { observer } from 'mobx-react-lite';
import { userApi } from 'services';
import { toast } from 'react-toastify';
import { useFetchUser, useFollow } from 'hooks';
import { routes, zeroAddress } from 'appConstants';
import { sliceString } from 'utils';

interface IProps {
  userId: string;
  setCurrentUser: any;
}

const UserMainInfo: FC<IProps> = observer(({ userId, setCurrentUser }) => {
  const { user } = useMst();
  // TODO: handle user load
  const [, setIsUserLoading] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isFollowClickPending, setIsFollowClickPending] = useState(false);
  const [userCover, setUserCover] = useState('');
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
    (file: File) => {
      setIsFileLoading(true);
      const fileData = new FormData();
      fileData.append('cover', file);
      userApi
        .setUserCover(fileData)
        .then(({ data }) => {
          toast.success('Cover uploaded');
          user.setCover(data);
          setUserCover(data);
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

  return (
    <section
      className={s.user}
      style={{
        backgroundImage: `url(${userCover || shownUser.cover || profile_page_bg_example})`,
      }}
    >
      <div className={s.user_avatar}>
        <img
          src={shownUser.avatar || profile_avatar_example}
          alt="profile_avatar_example"
          width={130}
          height={130}
        />
        {shownUser.is_verificated && <div className={s.isVerified} />}
      </div>
      <H2 className={s.user_name}>{shownUser.display_name || 'User Name'}</H2>
      <div className={s.user_info}>
        <Copyable
          valueToCopy={shownUser.address || zeroAddress}
          classNameIcon={s.user_info__icon}
          withIcon
          title="Address"
        >
          <Text size="m">{sliceString(shownUser.address || zeroAddress)}</Text>
        </Copyable>
      </div>
      <div className={s.user_buttons}>
        {isSelf ? (
          <>
            <Uploader isImgOnly isButton handleUpload={handleFileUpload} isLoading={isFileLoading}>
              <div className={s.user_button}>
                <img src={iconEdit} alt="" />
                <Text tag="span">Edit Banner</Text>
              </div>
            </Uploader>
            <Button className={s.user_button} color="outline" href={routes.profile.edit}>
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
