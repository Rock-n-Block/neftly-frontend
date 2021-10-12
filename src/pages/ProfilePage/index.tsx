import { TabLookingComponent } from 'components';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';
import UserMainInfo from './UserMainInfo';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Artworks, Collectibles, Favorited } from './Tabs';

const tabs = [
  {
    title: 'My Artworks',
    icon: art,
  },
  {
    title: 'Collectibles',
    icon: folders,
  },
  {
    title: 'Favorited',
    icon: heart,
  },
  {
    title: 'About Me',
    icon: me,
  },
];

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const [userAddress, setUserAddress] = useState('');

  return (
    <section className={s.page}>
      <UserMainInfo userId={userId} setUserAddress={setUserAddress} />

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            action={(value) => setActiveTab(value)}
          />
        </div>

        <div className={s.page_body__right}>
          {activeTab === 'My Artworks' && <Artworks userId={userId} />}
          {activeTab === 'Collectibles' && <Collectibles userId={userId} />}
          {activeTab === 'Favorited' && <Favorited userAddress={userAddress} />}
          {activeTab === 'About Me' && <></>}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
