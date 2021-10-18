import { TabLookingComponent } from 'components';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';
import UserMainInfo from './UserMainInfo';
import { useParams } from 'react-router';
import { FC, useCallback, useState } from 'react';
import { About, Artworks, Collectibles, Favorited } from './Tabs';
import { IExtendedInfo } from '../../typings';
import { useTabs } from 'hooks';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { useMst } from 'store';
import { userApi } from 'services';

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

const Profile: FC = observer(() => {
  const { user } = useMst();
  const { userId } = useParams<{ userId: string }>();
  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab, setActiveTab } = useTabs(tabs, initialTab);
  // const [activeTab, setActiveTab] = useState(tabs[0].title);
  const [currentUser, setCurrentUser] = useState<IExtendedInfo>({} as IExtendedInfo);

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
          {activeTab === 'artworks' && <Artworks userId={userId} likeAction={likeAction} />}
          {activeTab === 'collectibles' && <Collectibles userId={userId} likeAction={likeAction} />}
          {activeTab === 'favorited' && (
            <Favorited userAddress={currentUser?.address || ''} likeAction={likeAction} />
          )}
          {activeTab === 'about' && <About currentUser={currentUser} />}
        </div>
      </div>
    </section>
  );
});

export default Profile;
