import { useCallback, useEffect, useState } from 'react';
import { userApi } from 'services';
import { IExtendedInfo } from 'typings';
import { useMst } from '../store';

interface IProps {
  setLoading: (value: boolean) => void;
  id: string;
  successCallback?: (value: IExtendedInfo) => void;
}

export const useFetchUser = (props: IProps) => {
  const { setLoading, id, successCallback } = props;
  const { user: myUser } = useMst();
  const [user, setUser] = useState<IExtendedInfo>({
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
    created_at: new Date(),
  });
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  const fetchUser = useCallback(() => {
    setLoading(true);
    userApi
      .getUser({ id })
      .then(({ data }: any) => {
        setUser(data);
        if (successCallback) {
          successCallback(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, setLoading, successCallback]);

  const checkIsFollowed = useCallback(() => {
    return !!user.followers.find((follower) => follower.id.toString() === myUser.id.toString());
  }, [myUser.id, user.followers]);

  const checkIsFollowing = useCallback(() => {
    return !!user.follows.find((follower) => follower.id.toString() === myUser.id.toString());
  }, [myUser.id, user.follows]);

  const checkIsSelf = useCallback(() => {
    return user.id.toString() === myUser.id.toString();
  }, [myUser.id, user.id]);

  useEffect(() => {
    fetchUser();
  }, [id, fetchUser]);

  useEffect(() => {
    if (!myUser.id) {
      return;
    }
    setIsFollowed(checkIsFollowed());
    setIsFollowing(checkIsFollowing());
    setIsSelf(checkIsSelf());
  }, [checkIsFollowed, checkIsFollowing, checkIsSelf, myUser.id]);

  return {
    user,
    isSelf,
    isFollowed,
    setIsFollowed: (value: boolean) => setIsFollowed(value),
    isFollowing,
    setIsFollowing: (value: boolean) => setIsFollowing(value),
  };
};
