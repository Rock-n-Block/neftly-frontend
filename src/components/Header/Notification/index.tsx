import { FC, useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ReactComponent as Trangle } from 'assets/img/icons/triangle-white.svg';
import { activityApi } from 'services/api';
import { useMst } from 'store';
import { Button, Icon } from 'components';

import styles from './Notification.module.scss';
import { routes } from 'appConstants';

interface INotificationProps {
  className?: string;
}

const Notification: FC<INotificationProps> = observer(({ className }) => {
  const { user } = useMst();
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<any>([]);

  const fetchNotification = useCallback(() => {
    activityApi.getNotification().then(({ data }: any) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    if (user.address) fetchNotification();
  }, [user.address, fetchNotification]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className)}>
        <Button className={cn(styles.head, styles.active)} onClick={() => setVisible(!visible)}>
          <Icon name="notification" size="24" />
        </Button>
        {visible && (
          <div className={styles.body}>
            <Trangle className={styles.triangle} />
            <div className={cn('h4', styles.title)}>Notification</div>
            <div className={styles.list}>
              {items?.map((x: any) => (
                <Link
                  className={styles.item}
                  to={x.from_id ? routes.profile.link(x.from_id) : `/item/${x.token_id}`}
                  onClick={() => setVisible(!visible)}
                  key={nextId()}
                >
                  <div className={styles.preview}>
                    <img src={x.from_image || x.to_image} alt="Notification" />
                  </div>
                  <div className={styles.details}>
                    <div className={styles.subtitle}>
                      {x.from_name?.length > 21
                        ? `${x.from_name.slice(0, 14)}...${x.from_name.slice(-4)}`
                        : x.from_name}{' '}
                      {x.method}{' '}
                      {x.to_name?.length > 21
                        ? `${x.to_name.slice(0, 14)}...${x.to_name.slice(-4)}`
                        : x.to_name || x.to_id || x.token_name}
                    </div>
                    <div className={styles.price}>{x.price}</div>
                    <div className={styles.date}>{x.date}</div>
                  </div>
                  <div className={styles.status} style={{ background: x.color }} />
                </Link>
              ))}
            </div>
            <Link
              className={cn('button-small', styles.button)}
              to={routes.activity.root}
              onClick={() => setVisible(!visible)}
            >
              See all
            </Link>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
});

export default Notification;
