import { useCallback, useState } from 'react';
import nextId from 'react-id-generator';
import cn from 'classnames';

import Loader from '../../../components/Loader';
import { userApi } from '../../../services/api';

import styles from './Followers.module.scss';

interface IFollowersProps {
  className?: string;
  isShowButtons: boolean;
  following: Array<{
    name: string;
    counter: string;
    avatar: string;
    id: string;
    buttonClass: string;
    tokens: string[];
  }>;
  followers: Array<{
    name: string;
    counter: string;
    avatar: string;
    id: string;
    buttonClass: string;
    tokens: string[];
  }>;
  activeIndex: number;
}

const Followers: React.FC<IFollowersProps> = ({
  className,
  following,
  followers,
  isShowButtons,
  activeIndex,
}) => {
  const [followingIds, setFollowingIds] = useState<Array<any>>([
    ...following.map((i: any) => i.id),
  ]);
  const follow = useCallback((id: string) => {
    userApi.follow({ id }).then(() => setFollowingIds([...followingIds, id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unfollow = useCallback((id: string) => {
    userApi
      .unfollow({ id })
      .then(() => setFollowingIds([...followingIds.filter((i: any) => i !== id)]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cn(styles.followers, className)}>
      <div className={styles.list}>
        {activeIndex === 4
          ? following.map((x) => (
              <div className={styles.item} key={nextId()}>
                <div className={styles.follower}>
                  <a
                    href={`/profile/${x.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.avatar}
                  >
                    <img src={x.avatar} alt="Avatar" />
                  </a>
                  <div className={styles.details}>
                    <div className={styles.title}>
                      {x.name.length > 21
                        ? `${x.name.slice(0, 18)}...${x.name.slice(-4)}`
                        : `${x.name}`}
                    </div>
                    <div className={styles.counter}>{x.counter}</div>
                    {isShowButtons && (
                      <button
                        type="button"
                        className={cn('button-stroke button-small', styles.button)}
                        onClick={
                          followingIds.includes(x.id) ? () => unfollow(x.id) : () => follow(x.id)
                        }
                      >
                        {followingIds.includes(x.id) ? 'unfollow' : 'follow'}
                      </button>
                    )}
                  </div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.gallery}>
                    {x.tokens.map((y: any) => (
                      <a
                        className={styles.preview}
                        key={nextId()}
                        href={`/item/${y.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={y.media} alt="Follower" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : followers.map((x) => (
              <div className={styles.item} key={nextId()}>
                <div className={styles.follower}>
                  <a
                    href={`/profile/${x.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.avatar}
                  >
                    <img src={x.avatar} alt="Avatar" />
                  </a>
                  <div className={styles.details}>
                    <div className={styles.title}>
                      {x.name.length > 21
                        ? `${x.name.slice(0, 18)}...${x.name.slice(-4)}`
                        : `${x.name}`}
                    </div>
                    <div className={styles.counter}>{x.counter}</div>
                    {isShowButtons && (
                      <button
                        type="button"
                        className={cn('button-stroke button-small', styles.button)}
                        onClick={
                          followingIds.includes(x.id) ? () => unfollow(x.id) : () => follow(x.id)
                        }
                      >
                        {followingIds.includes(x.id) ? 'unfollow' : 'follow'}
                      </button>
                    )}
                  </div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.gallery}>
                    {x.tokens.map((y: any) => (
                      <a
                        className={styles.preview}
                        key={nextId()}
                        href={`/item/${y.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={y.media} alt="Follower" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Loader className={styles.loader} />
    </div>
  );
};

export default Followers;
