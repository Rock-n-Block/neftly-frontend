import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { ReactComponent as Circle } from '../../assets/img/icons/circle-gradient.svg';
import Control from '../../components/Control';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import { activityApi } from '../../services/api';
import { useMst } from '../../store/store';

import Filters from './Filters';

import styles from './Activity.module.scss';

const breadcrumbs = [
  {
    title: 'Profile',
    url: '/',
  },
  {
    title: 'Activity',
  },
];

const filters = [
  'Sales',
  'Listings',
  'Bids',
  'Burns',
  'Followings',
  'Likes',
  'Purchase',
  'Transfers',
  'Mints',
];

const navLinks = ['My activity', 'Following', 'All activity'];

const Activity: React.FC = observer(() => {
  const { user } = useMst();
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState<any>({
    address: '',
    page: 1,
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const fetchActivity = useCallback(
    (address: string) => {
      activityApi.getActivity(address, formData.page, selectedFilters).then(({ data }: any) => {
        setItems(data);
      });
    },
    [formData.page, selectedFilters],
  );

  const handleFilters = useCallback(
    (values: any) => {
      setSelectedFilters(values);
      fetchActivity(formData.address);
    },
    [fetchActivity, formData.address],
  );

  const handleNavLinks = useCallback(
    (value: any) => {
      switch (value) {
        case 0:
          if (!user.address) return;
          handleChange('address', user.address);
          fetchActivity(user.address);
          break;
        case 1:
          handleChange('address', `${user.address}/following`);
          fetchActivity(`${user.address}/following`);
          break;
        case 2:
          handleChange('address', '');
          fetchActivity('');
          break;
        default:
          break;
      }
      setActiveIndex(value);
      // setIsLoading(true);
    },
    [fetchActivity, user.address],
  );

  const readNotification = useCallback(
    (activity_id: number, method: string, link_id: number | string) => {
      activityApi.readNotification({ activity_id, method }).then((data: any) => {
        if (data.statusText === 'OK') {
          if (method === 'follow') {
            history.push(`/profile/${link_id}`);
          } else {
            history.push(`/item/${link_id}`);
          }
        }
      });
    },
    [history],
  );

  const openNotification = (method: string, link_id: number | string) => {
    if (method === 'follow') {
      history.push(`/profile/${link_id}`);
    } else {
      history.push(`/item/${link_id}`);
    }
  };

  const readAllNotifications = useCallback(() => {
    activityApi.readNotification({ activity_id: 0, method: 'all' }).then((data: any) => {
      if(data.statusText === 'OK') history.push('/activity')
    });
  }, [history]);

  useEffect(() => {
    handleNavLinks(0);
  }, [handleNavLinks]);

  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn('section-pt80', styles.body)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Activity</h1>
            {activeIndex === 0 && (
              <button
                type="button"
                className={cn('button-stroke button-small mobile-hide', styles.button)}
                onClick={() => readAllNotifications()}
              >
                Mark all as read
              </button>
            )}
            <button
              type="button"
              className={cn('button-circle-stroke button-small tablet-show', styles.toggle, {
                [styles.active]: visible,
              })}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="filter" size="24" />
              <Icon name="close" size="14" />
            </button>
          </div>
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                {navLinks.map((x, index) => (
                  <button
                    type="button"
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    onClick={() => handleNavLinks(index)}
                    key={nextId()}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className={styles.list}>
                {items?.map((x: any) => (
                  <div
                    className={styles.item}
                    key={nextId()}
                    onClick={
                      activeIndex === 0
                        ? () => readNotification(x.id, x.method, x.token_id || x.from_id)
                        : () => openNotification(x.method, x.token_id || x.from_id)
                    }
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className={cn(styles.preview, {
                        [styles.hidden]: activeIndex === 0 && x.is_viewed,
                      })}
                    >
                      <img src={x.from_image || x.to_image} alt="Notification" />
                      <div className={styles.icon} style={{ backgroundColor: x.color }}>
                        <img src={x.token_image || x.to_image} alt="Icon notification" />
                      </div>
                    </div>
                    <div className={styles.details}>
                      <div className={cn(styles.subtitle, 'text-gradient')}>
                        {x.to_name?.length > 21
                          ? `${x.to_name.slice(0, 14)}...${x.to_name.slice(-4)}`
                          : x.to_name}
                      </div>
                      <div className={styles.description}>{x.method}</div>
                      <div className={styles.date}>{x.date}</div>
                    </div>
                    <Circle
                      className={cn(styles.circle, {
                        [styles.hidden]: activeIndex !== 0,
                      })}
                    />
                  </div>
                ))}
              </div>
              <Loader className={styles.loader} />
            </div>
            {activeIndex === 0 && (
              <button
                type="button"
                className={cn('button-stroke button-small mobile-show', styles.button)}
                onClick={() => readAllNotifications()}
              >
                Mark all as read
              </button>
            )}
            <Filters
              className={cn(styles.filters, { [styles.active]: visible })}
              filters={filters}
              selectedFilters={selectedFilters}
              setSelectedFilters={handleFilters}
              selectAll={() => handleFilters(filters)}
              unselectAll={() => handleFilters([])}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Activity;
