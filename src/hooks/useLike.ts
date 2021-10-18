import { useCallback, useEffect, useState } from 'react';
import { userApi } from 'services';
import { TOptionable } from 'typings';

export const useLike = (
  isLiked: boolean,
  likes: number,
  id: TOptionable<string | number>,
  hasAddress: boolean,
) => {
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const likeAction = useCallback(() => {
    if (hasAddress) {
      userApi.like({ id });
    }
  }, [hasAddress, id]);

  const handleLike = useCallback(() => {
    setIsLike(!isLike);
    if (isLike) {
      setLikeCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    } else {
      setLikeCount((prev) => prev + 1);
    }
    likeAction();
  }, [isLike, likeAction]);

  useEffect(() => {
    setIsLike(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  return hasAddress
    ? {
        isLike,
        likeCount,
        handleLike,
      }
    : {};
};
