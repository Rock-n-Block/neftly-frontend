import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ReactComponent as Circles } from '../../../assets/img/icons/circles-gradient.svg';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import Report from '../../../components/Report';
import { userApi } from '../../../services/api';
import { useMst } from '../../../store/store';

import styles from './User.module.scss';

const shareUrlFacebook = 'https://ui8.net';
const shareUrlTwitter = 'https://ui8.net';

// TODO: fix any
interface IUserProps {
  className?: string;
  item: any;
  userId: string;
  isFollow: boolean;
  handleUpdateFollowers?: () => void;
  userData: {
    id: number | string;
    avatar: string;
    display_name?: string;
    address: string;
    followers: Array<any>;
    followers_count: number;
    follows_count: number;
  };
}

const User: React.FC<IUserProps> = observer(
  ({ className, item, isFollow, handleUpdateFollowers, userData }) => {
    const [visible, setVisible] = useState(isFollow);
    const [copyAddress, setCopyAddress] = useState(false);
    const [visibleShare, setVisibleShare] = useState(false);
    const [visibleModalReport, setVisibleModalReport] = useState(false);
    const { user } = useMst();

    const handleCopy = () => {
      navigator.clipboard.writeText(user.address);
      setCopyAddress(true);
    };

    const follow = useCallback(async () => {
      await userApi.follow({ id: userData.id });
      if (handleUpdateFollowers) {
        await handleUpdateFollowers();
      }
    }, [userData.id, handleUpdateFollowers]);

    const unfollow = useCallback(async () => {
      await userApi.unfollow({ id: userData.id });
      if (handleUpdateFollowers) {
        await handleUpdateFollowers();
      }
    }, [userData.id, handleUpdateFollowers]);

    useEffect(() => {
      if (userData.followers.length) {
        setVisible(userData.followers.filter((i: any) => i.id === user.id).length > 0);
      }
    }, [userData.followers, user.id]);

    return (
      <>
        <div className={cn(styles.user, className)}>
          <div className={styles.avatar}>
            {userData.avatar ? <img src={userData.avatar} alt="Avatar" /> : <Loader />}
          </div>
          <div className={styles.name}>{userData.display_name || 'User'}</div>
          <div className={styles.code}>
            <div className={styles.number}>
              {userData.address.slice(0, 14)}...{userData.address.slice(-4)}
            </div>
            <Button
              className={styles.copy}
              onClick={handleCopy}
              onMouseLeave={() => setCopyAddress(false)}
            >
              <Circles />
              <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>
                  {copyAddress ? 'Success!' : 'Copy adress'}
                </span>
              </div>
            </Button>
          </div>
          {/* <div className={styles.info}>
            A wholesome farm owner in Montana. Upcoming gallery solo show in Germany
          </div> */}
          <a
            className={styles.site}
            href="https://ui8.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="globe" size="16" />
            <span>https://ui8.net</span>
          </a>
          <div className={styles.control}>
            <div className={styles.btns}>
              {userData.id !== user.id && (
                <button
                  type="button"
                  className={cn('button button-small', { [styles.active]: visible }, styles.button)}
                  onClick={() => setVisible(!visible)}
                >
                  <span tabIndex={0} onKeyDown={() => {}} role="button" onClick={follow}>
                    Follow
                  </span>
                  <span tabIndex={0} onKeyDown={() => {}} role="button" onClick={unfollow}>
                    Unfollow
                  </span>
                </button>
              )}
              <button
                type="button"
                className={cn(
                  'button-circle-stroke button-small',
                  { [styles.active]: visibleShare },
                  styles.button,
                )}
                onClick={() => setVisibleShare(!visibleShare)}
              >
                <Icon name="share" size="20" />
              </button>
              <button
                type="button"
                className={cn('button-circle-stroke button-small', styles.button)}
                onClick={() => setVisibleModalReport(true)}
              >
                <Icon name="report" size="20" />
              </button>
            </div>
            <div className={styles.followers}>
              <div className={styles.wrapper}>
                <span className={styles.text}>Followers:</span>
                <div className={styles.circle}>
                  <div className={styles.inner}>{userData.followers_count}</div>
                </div>
              </div>
              <div className={styles.wrapper}>
                <span className={styles.text}>Following:</span>
                <div className={styles.circle}>
                  <div className={styles.inner}>{userData.follows_count}</div>
                </div>
              </div>
            </div>
            <div className={cn(styles.box, { [styles.active]: visibleShare })}>
              <div className={styles.stage}>Share link to this page</div>
              <div className={styles.share}>
                <TwitterShareButton className={styles.direction} url={shareUrlTwitter}>
                  <span>
                    <Icon name="twitter" size="20" />
                  </span>
                </TwitterShareButton>
                <FacebookShareButton className={styles.direction} url={shareUrlFacebook}>
                  <span>
                    <Icon name="facebook" size="20" />
                  </span>
                </FacebookShareButton>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            {item.map((x: any) => (
              <a
                className={styles.social}
                href={x.url}
                target="_blank"
                rel="noopener noreferrer"
                key={nextId()}
              >
                <Icon name={x.title} size="20" />
              </a>
            ))}
          </div>
          <div className={styles.note}>Member since Mar 15, 2021</div>
        </div>
        <Modal visible={visibleModalReport} onClose={() => setVisibleModalReport(false)}>
          <Report />
        </Modal>
      </>
    );
  },
);

export default User;
