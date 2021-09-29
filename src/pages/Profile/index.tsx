import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// data
// import { bids } from '../../mocks/bids';
import { observer } from 'mobx-react';

import Icon from '../../components/Icon';
import { storeApi, userApi } from '../../services/api';
import { useMst } from '../../store/store';

import Followers from './Followers';
import Items from './Items';
import User from './User';

import styles from './Profile.module.scss';

const navLinks = ['On Sale', 'Collectibles', 'Created', 'Likes', 'Following', 'Followers'];

const socials = [
  {
    title: 'twitter',
    url: 'https://twitter.com/ui8',
  },
  {
    title: 'instagram',
    url: 'https://www.instagram.com/ui8net/',
  },
  {
    title: 'facebook',
    url: 'https://www.facebook.com/ui8.net/',
  },
];

const Profile: React.FC = observer(() => {
  const { user } = useMst();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState(false);
  const [collectibles, setCollectibles] = useState([]);
  const [created, setCreated] = useState([]);
  const [liked, setLiked] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [userPhoto, setUserPhoto] = useState('');
  const [userFile, setUserFile] = useState<any>(null);
  const [shownUser, setShownUser] = useState<{
    id: number | string;
    avatar: string;
    display_name?: string;
    address: string;
    cover: string;
    followers: Array<any>;
    followers_count: number;
    follows_count: number;
  }>({
    address: '',
    cover: '',
    id: '',
    avatar: '',
    display_name: '',
    followers: [],
    followers_count: 0,
    follows_count: 0,
  });

  const getFollowers = useCallback(async () => {
    const followersRes: any = await userApi.getFollowers(userId, 1);
    setFollowers(followersRes.data);
  }, [userId]);

  const fetchCollectibles = useCallback(async () => {
    if (shownUser.address) {
      const { data } = await storeApi.getCollectibles(shownUser.address, '1');
      setCollectibles(data);
      const createdRes = await storeApi.getCreated(shownUser.address, 1);
      setCreated(createdRes.data);
      const likedRes = await storeApi.getLiked(shownUser.address, 1);
      setLiked(likedRes.data);
      const followingRes = await userApi.getFollowing(userId, 1);
      setFollowing(followingRes.data);
      getFollowers();
    }
  }, [shownUser, userId, getFollowers]);

  const getUser = useCallback(() => {
    userApi.getUser({ id: userId }).then(({ data }: any) => setShownUser(data));
  }, [userId]);

  const setUserCover = useCallback(() => {
    userApi.setUserCover(userFile).then(() => setVisible(false));
  }, [userFile]);

  const handleChangePhoto = (value: any) => {
    const isValidType =
      value.type === 'image/jpeg' || value.type === 'image/png' || value.type === 'image/webp';
    if (!isValidType) {
      return;
    }
    const isLt2M = value.size / 1024 / 1024 < 30;
    if (!isLt2M) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUserPhoto(typeof reader.result === 'string' ? reader.result : '');
    });
    reader.readAsDataURL(value);
    setUserFile(value);
  };

  useEffect(() => {
    if (userId) {
      getUser();
    } else {
      history.push('/');
    }
  }, [getUser, userId, history]);

  useEffect(() => {
    fetchCollectibles();
  }, [fetchCollectibles]);

  useEffect(() => {
    if (typeof user.id === 'number') {
      setVisibleButtons(user.id === +userId);
    }
    if (typeof user.id === 'string') {
      setVisibleButtons(user.id === userId);
    }
  }, [user.id, userId]);
  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: userPhoto
            ? `url(${userPhoto})`
            : `url(${shownUser.cover || '/images/content/bg-profile.jpg'})`,
        }}
      >
        {visibleButtons && (
          <div className={cn('container', styles.container)}>
            <div className={styles.btns}>
              <button
                type="button"
                className={cn('button-stroke button-small', styles.button)}
                onClick={() => setVisible(true)}
              >
                <span>Edit cover photo</span>
                <Icon name="image" size="16" />
              </button>
              <Link className={cn('button-stroke button-small', styles.button)} to="/profile-edit">
                <span>Edit profile</span>
                <Icon name="edit" size="16" />
              </Link>
            </div>
            <div className={styles.file}>
              <input
                type="file"
                // eslint-disable-next-line
                // @ts-ignore
                onChange={(e) => handleChangePhoto(e.target.files[0])}
              />
              <div className={styles.wrap}>
                <Icon name="upload-file" size="48" />
                <div className={styles.info}>Drag and drop your photo here</div>
                <div className={styles.text}>or click to browse</div>
              </div>
              <button
                type="button"
                className={cn('button-small', styles.button)}
                onClick={() => setUserCover()}
              >
                Save photo
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={cn('container', styles.container)}>
          <User
            className={styles.user}
            item={socials}
            userId={userId}
            isFollow={following.filter((i: any) => i.id === user.id).length > 0}
            handleUpdateFollowers={getFollowers}
            userData={shownUser}
          />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  type="button"
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={nextId()}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items
                    className={styles.items}
                    items={collectibles.filter(
                      (item: any) => item.is_selling || item.is_auc_selling,
                    )}
                  />
                )}
                {activeIndex === 1 && <Items className={styles.items} items={collectibles} />}
                {activeIndex === 2 && <Items className={styles.items} items={created} />}
                {activeIndex === 3 && <Items className={styles.items} items={liked} />}
                {activeIndex === 4 && (
                  <Followers
                    className={styles.followers}
                    following={following}
                    followers={followers}
                    isShowButtons={user.id === userId}
                    activeIndex={activeIndex}
                  />
                )}
                {activeIndex === 5 && (
                  <Followers
                    className={styles.followers}
                    following={following}
                    followers={followers}
                    isShowButtons={user.id === userId}
                    activeIndex={activeIndex}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
