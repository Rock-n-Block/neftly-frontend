import { useCallback, useEffect, useState } from 'react';
import { userApi } from 'services';
import { toast } from 'react-toastify';

interface IProps {
  setLoading: (value: boolean) => void;
  id: string;
  initialState: boolean;
  successCallback?: (value: boolean) => void;
}

export const useFollow = (props: IProps) => {
  const { setLoading, id, successCallback, initialState } = props;
  const [isFollowed, setIsFollowed] = useState(initialState);

  const handleFollowClick = useCallback(() => {
    setLoading(true);
    if (isFollowed) {
      userApi
        .unfollow({ id })
        .then(() => {
          toast.success('Success unfollow');
          setIsFollowed(false);
          if (successCallback) {
            successCallback(false);
          }
        })
        .catch((error) => {
          toast.error('Error when unfollow');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      userApi
        .follow({ id })
        .then(() => {
          toast.success('Success follow');
          setIsFollowed(true);
          if (successCallback) {
            successCallback(true);
          }
        })
        .catch((error) => {
          toast.error('Error when follow');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isFollowed, setLoading, successCallback]);
  useEffect(() => {
    setIsFollowed(initialState);
  }, [initialState]);
  return {
    handleFollowClick,
  };
};
