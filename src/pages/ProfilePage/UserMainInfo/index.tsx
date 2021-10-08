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
import { useHistory, useParams } from 'react-router';

const UserMainInfo: React.FC = observer(() => {
  const history = useHistory();
  const { user } = useMst();
  const { userId } = useParams<{ userId: string }>();
  const [shownUser, setShownUser] = useState<IExtendedInfo>({
    address: '',
    cover: '',
    id: 0,
    avatar: '',
    display_name: '',
    followers: [],
    followers_count: 0,
    follows_count: 0,
    twitter: null,
    instagram: null,
    facebook: null,
    site: null,
    bio: null,
    is_verificated: false,
    custom_url: '',
    follows: [],
  });
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isSelf = shownUser.id.toString() === user.id.toString();

  const getUser = useCallback(() => {
    userApi.getUser({ id: userId }).then(({ data }: any) => setShownUser(data));
  }, [userId]);

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

  const handleFileUpload = (file: any) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (userId) {
      getUser();
    } else {
      history.push('/');
    }
  }, [getUser, userId, history]);
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
            <Uploader type="img" isButton handleUpload={handleFileUpload} isLoading={isLoading}>
              <Button className={s.user_button} color="outline" loading={isLoading}>
                <img src={iconEdit} alt="" />
                <Text tag="span">Edit Banner</Text>
              </Button>
            </Uploader>
            <Button className={s.user_button} color="outline" href="/profile/edit">
              <img src={iconSettings} alt="" />
              <Text tag="span">Edit Profile</Text>
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
