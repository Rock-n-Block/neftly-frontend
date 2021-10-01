import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { useMst } from '../../store/store';
import { ActivityItem, Loader, Button, H2, H3, ArtCard } from 'components';
import { activityApi } from '../../services/api';
import Filters from './Filters';
import { data as cardsData } from './mockData';

import styles from './Activity.module.scss';

import { ReactComponent as Circle } from 'assets/img/icons/circle-gradient.svg';
import { ReactComponent as FilterIcon } from 'assets/img/ActivityPage/filter.svg';
// EXAMPLE IMGS FOR ACTIVITY ITEMS
import actionExample from 'assets/img/ActivityPage/action_example.png';
import actionExample2 from 'assets/img/ActivityPage/action_example2.png';
import userAvaExample from 'assets/img/ActivityPage/user_ava_example.png';
import userAvaExample2 from 'assets/img/ActivityPage/user_ava_example2.png';

const actionsMockData = [
  {
    activityType: 'likes',
    id: 1,
    userImg: userAvaExample,
    actionImg: actionExample2,
    userName: 'Balgo Parks',
    actionDescription: 'Commented on article The biggest drop in Times Square since New Years Eve',
    timeAgo: '12 minutes ago',
  },
  {
    activityType: 'followers',
    id: 2,
    userImg: userAvaExample2,
    actionImg: actionExample,
    userName: 'Ninny Spangcole',
    actionDescription:
      'Added Nightmare in a strange world of Fire by Wolfgang Slashhaut to Collection',
    timeAgo: '5 minutes ago',
  },
  {
    activityType: 'comments',
    id: 3,
    userImg: userAvaExample,
    actionImg: actionExample2,
    userName: 'Balgo Parks',
    actionDescription: 'Liked Ring of Fire by Bruno Bangnyfe',
    timeAgo: '45 minutes ago',
  },
  {
    activityType: 'collections',
    id: 4,
    userImg: userAvaExample2,
    actionImg: actionExample,
    userName: 'Ninny Spangcole',
    actionDescription: 'Followed Balgo Parks',
    timeAgo: '2 minutes ago',
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
      if (data.statusText === 'OK') history.push('/activity');
    });
  }, [history]);

  useEffect(() => {
    handleNavLinks(0);
  }, [handleNavLinks]);

  return (
    <div className={styles.page}>
      <div className={cn(styles.section, styles.body)}>
        <div className={styles.container}>
          <H2 className={styles.pageTitle}>Social activity</H2>
          <div className={styles.pageSubtitle}>
            keep track of all the latest activity on the platform
          </div>
          <div className={styles.buttonWrap}>
            <Button className={styles.switchButton} color="outline">
              Switch to Multiple
            </Button>
          </div>

          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Activity</h1>
            <Button
              color="outline"
              className={cn('button-circle-stroke button-small tablet-show', styles.toggle)}
              onClick={() => setVisible(!visible)}
            >
              <FilterIcon />
            </Button>
          </div>
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {/* OLD ITEMS */}
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
                {actionsMockData.map((action) => (
                  <ActivityItem key={action.id} {...action} />
                ))}
              </div>
              <Loader className={styles.loader} />
              <div className={styles.buttonWrap}>
                <Button className={styles.moreButton} color="outline">
                  Load More
                </Button>
              </div>
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
        <div className={styles.hotArtworks}>
          <div className={styles.container}>
            <H3 className={styles.artworksTitle}>Hot Artworks</H3>
            <div className={styles.works}>
              {cardsData.map((card) => (
                <ArtCard
                  className={styles.artwork}
                  key={`${card.author}-${card.likesNumber}-${card.price}`}
                  {...card}
                  imageMain={card.image}
                />
              ))}
            </div>
            <div className={styles.buttonWrap}>
              <Button className={styles.moreButton} color="outline">
                View More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Activity;
