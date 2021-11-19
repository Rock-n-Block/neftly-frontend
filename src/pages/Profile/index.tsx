import { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Art, Folders, Heart, Me } from 'assets/img';
import cn from 'classnames';
import { Text, TabLookingComponent } from 'components';
import { useFetchLiked, useFetchNft, useFilters, useTabs } from 'hooks';
import { observer } from 'mobx-react';
import { userApi } from 'services';
import { useMst } from 'store';

import { IExtendedInfo } from 'typings';

import { About, Artworks, Favorited } from './Tabs';
import UserMainInfo from './UserMainInfo';

import s from './ProfilePage.module.scss';

const tabs = [
  {
    title: 'Created',
    key: 'created',
    icon: <Art />,
  },
  {
    title: 'Owned',
    key: 'owned',
    icon: <Folders />,
  },
  {
    title: 'Favorited',
    key: 'favorited',
    icon: <Heart />,
  },
  {
    title: 'About Me',
    key: 'about',
    icon: <Me />,
  },
];

const ProfilePage: FC = observer(() => {
  const { user } = useMst();
  const { userId } = useParams<{ userId: string }>();
  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab, setActiveTab } = useTabs(tabs, initialTab);
  const [currentUser, setCurrentUser] = useState<IExtendedInfo>({} as IExtendedInfo);

  const creatorOrOwner = useMemo(() => {
    switch (activeTab) {
      case 'created':
        return 'creator';
      case 'owned':
        return 'owner';
      default:
        return '';
    }
  }, [activeTab]);

  const {
    orderByFilter,
    handleOrderByFilter,
    page,
    handlePage,
    isLoading: isFiltersLoading,
  } = useFilters();

  const [allPages, totalItems, nftCards, isNftsLoading] = useFetchNft(
    {
      page,
      sort: 'items',
      [creatorOrOwner]: userId,
      order_by: orderByFilter.value,
      isOnlyForOwnerOrCreator: true,
    },
    false,
    true,
  );

  const [allPagesLiked, totalItemsLiked, nftCardsLicked, isLickesLoading] = useFetchLiked({
    page,
    address: userId,
    isRefresh: activeTab === 'favorited',
  });

  const likeAction = useCallback(
    (id): Promise<any> => {
      if (!user.address) {
        return Promise.reject(new Error('Please login'));
      }
      return userApi.like({ id });
    },
    [user.address],
  );

  return (
    <section className={s.page}>
      <UserMainInfo userId={userId} setCurrentUser={setCurrentUser} />

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <Text tag="p" size="m" className={s.subtitle}>
            Menu
          </Text>
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            activeTab={activeTab}
            action={setActiveTab}
          />
        </div>

        <div className={cn(s.page_body__right, activeTab === 'about' && s.page_body__about)}>
          {(activeTab === 'created' || activeTab === 'owned') && (
            <Artworks
              likeAction={likeAction}
              page={page}
              allPages={allPages}
              handlePage={handlePage}
              isFiltersLoading={isFiltersLoading}
              isNftsLoading={isNftsLoading}
              totalItems={totalItems}
              orderByFilter={orderByFilter}
              handleOrderByFilter={handleOrderByFilter}
              nftCards={nftCards}
            />
          )}
          {activeTab === 'favorited' && (
            <Favorited
              page={page}
              handlePage={handlePage}
              isFiltersLoading={isFiltersLoading}
              likeAction={likeAction}
              allPages={allPagesLiked}
              isLickesLoading={isLickesLoading}
              totalItems={totalItemsLiked}
              nftCards={nftCardsLicked}
            />
          )}
          {activeTab === 'about' && <About currentUser={currentUser} />}
        </div>
      </div>
    </section>
  );
});

export default ProfilePage;
