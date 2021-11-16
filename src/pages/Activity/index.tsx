import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconFilter, profile_avatar_example } from 'assets/img';
import cn from 'classnames';
import { ActivityItem, Button, H2, H3, Loader, Text } from 'components';
import { observer } from 'mobx-react';
import moment from 'moment';

import Filters from './Filters';

import styles from './Activity.module.scss';
import { useFetchActivity } from 'hooks';
import { routes } from 'appConstants';
import { useMst } from 'store';
import { activityApi } from 'services';

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

const Activity: FC = observer(() => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [items, setItems] = useState<any>([]);
  const { user } = useMst();

  const { totalItems, items, selectedFilters, handleFilters, handlePage, page } =
    useFetchActivity(setIsLoading);

  const openNotification = (
    method: string,
    link_id: number | string,
    activity_id: string | number,
  ) => {
    activityApi.readNotification({ activity_id, method });
    if (method === 'follow') {
      history.push(routes.profile.link(link_id));
    } else {
      history.push(routes.nft.link(link_id));
    }
  };

  return (
    <div className={styles.page}>
      <div className={cn(styles.section, styles.body)}>
        <div className={styles.container}>
          <H2 align="center" className={styles.pageTitle}>
            Social activity
          </H2>
          <Text
            align="center"
            className={styles.pageSubtitle}
            color="black"
            size="m"
            weight="medium"
          >
            keep track of all the latest activity on the platform
          </Text>

          <div className={styles.top}>
            <H3 className={cn('h2', styles.title)}>Activity</H3>
            <Button
              color="outline"
              className={cn('button-circle-stroke button-small tablet-show', styles.toggle)}
              onClick={() => setVisible(!visible)}
            >
              <IconFilter />
            </Button>
          </div>
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.list}>
                {items?.length ? (
                  items
                    ?.filter((el: any) => !el.is_viewed)
                    .map((card: any) => (
                      <div
                        key={`${card.id}-${card.date}-${card.from_address}-${card.method}`}
                        onClick={() =>
                          openNotification(card.method, card.token_id || card.from_id, card.id)
                        }
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={0}
                      >
                        <ActivityItem
                          activityType={card.method}
                          userImg={card.from_image || card.to_image || profile_avatar_example}
                          actionImg={card.token_image || card.to_image}
                          userName={
                            [card.from_id, card.to_id].includes(user.id)
                              ? 'You'
                              : card.from_name || card.to_name
                          }
                          actionDescription={card.method}
                          actionDescriptionName={card.token_name || card.to_name}
                          timeAgo={moment().from(card.date)}
                        />
                      </div>
                    ))
                ) : (
                  <>{!isLoading ? <Text>No activities</Text> : <Loader />}</>
                )}
              </div>

              {items?.length < totalItems && (
                <div className={styles.buttonWrap}>
                  {isLoading ? (
                    <Loader className={styles.loader} />
                  ) : (
                    <Button
                      className={styles.moreButton}
                      color="outline"
                      onClick={() => handlePage(page + 1)}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              )}
            </div>
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
