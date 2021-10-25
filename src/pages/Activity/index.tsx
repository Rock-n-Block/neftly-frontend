import { FC, useState } from 'react';
import nextId from 'react-id-generator';
import { useHistory } from 'react-router-dom';
import { IconFilter, profile_avatar_example } from 'assets/img';
import cn from 'classnames';
import { ActivityItem, Button, H2, Loader, Text } from 'components';
import { observer } from 'mobx-react';
import moment from 'moment';

import Filters from './Filters';

import styles from './Activity.module.scss';
import { useFetchActivity } from 'hooks';
import { routes } from 'appConstants';

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

  const { totalItems, items, selectedFilters, handleFilters, handlePage, page } =
    useFetchActivity(setIsLoading);

  const openNotification = (method: string, link_id: number | string) => {
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
            color="lightGray"
            size="m"
            weight="medium"
          >
            keep track of all the latest activity on the platform
          </Text>

          <div className={styles.top}>
            <h1 className={cn('h2', styles.title)}>Activity</h1>
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
                {/* OLD ITEMS */}
                {/* TODO: fix this later */}
                {items?.length ? (
                  items?.map((card: any) => (
                    <div
                      key={nextId()}
                      onClick={() => openNotification(card.method, card.token_id || card.from_id)}
                      onKeyDown={() => {}}
                      role="button"
                      tabIndex={0}
                    >
                      <ActivityItem
                        activityType={card.method}
                        userImg={card.from_image || card.to_image || profile_avatar_example}
                        actionImg={card.token_image || card.to_image}
                        userName={card.from_name || card.to_name}
                        actionDescription={`${card.method} ${card.token_name || card.to_name}`}
                        timeAgo={moment().from(card.date)}
                      />
                    </div>
                  ))
                ) : (
                  <>{!isLoading && <Text>No activities</Text>}</>
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
