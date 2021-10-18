import cn from 'classnames';
import { observer } from 'mobx-react';
import { useMst } from 'store';
import { useParams } from 'react-router';
import { useCallback, useState, useMemo, FC } from 'react';

import UserMainInfo from './UserMainInfo';
import { TabLookingComponent } from 'components';
import { About, Artworks, Favorited } from './Tabs';
import { IExtendedInfo } from '../../typings';
import { useTabs, useFilters, useFetchNft, useFetchLiked } from 'hooks';
import { useLocation } from 'react-router-dom';
import { userApi } from 'services';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';

const tabs = [
  {
    title: 'My Artworks',
    key: 'artworks',
    icon: art,
  },
  {
    title: 'Collectibles',
    key: 'collectibles',
    icon: folders,
  },
  {
    title: 'Favorited',
    key: 'favorited',
    icon: heart,
  },
  {
    title: 'About Me',
    key: 'about',
    icon: me,
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
      case 'artworks':
        return 'creator';
      case 'collectibles':
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

  const [allPages, totalItems, nftCards, isNftsLoading] = useFetchNft({
    page,
    sort: 'items',
    [creatorOrOwner]: userId,
    order_by: orderByFilter.value,
  });

  const [allPagesLiked, totalItemsLiked, nftCardsLicked, isLickesLoading] = useFetchLiked({
    page,
    address: user.address,
    isRefresh: activeTab === 'favorited',
  });

  const likeAction = useCallback(
    (id) => {
      if (user.address) {
        userApi.like({ id });
      }
    },
    [user.address],
  );
  return (
    <section className={s.page}>
      <UserMainInfo userId={userId} setCurrentUser={setCurrentUser} />

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          {/* TODO: change mobile view */}
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            activeTab={activeTab}
            action={setActiveTab}
          />
        </div>

        <div className={cn(s.page_body__right, activeTab === 'about' && s.page_body__about)}>
          {activeTab === 'artworks' || activeTab === 'collectibles' ? (
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
          ) : null}
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
