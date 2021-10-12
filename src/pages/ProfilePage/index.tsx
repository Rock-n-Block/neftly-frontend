import { TabLookingComponent } from 'components';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';
import UserMainInfo from './UserMainInfo';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Artworks, Collectibles, Favorited } from './Tabs';
import { IExtendedInfo } from '../../typings';
import { useTabs } from 'hooks';
import { useLocation } from 'react-router-dom';

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

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab, setActiveTab } = useTabs(tabs, initialTab);
  // const [activeTab, setActiveTab] = useState(tabs[0].title);
  const [currentUser, setCurrentUser] = useState<IExtendedInfo>();

  return (
    <section className={s.page}>
      <UserMainInfo userId={userId} setCurrentUser={setCurrentUser} />

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            activeTab={activeTab}
            action={setActiveTab}
          />
        </div>

        <div className={s.page_body__right}>
          {activeTab === 'artworks' && <Artworks userId={userId} />}
          {activeTab === 'collectibles' && <Collectibles userId={userId} />}
          {activeTab === 'favorited' && <Favorited userAddress={currentUser?.address || ''} />}
          {activeTab === 'about' && <></>}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
