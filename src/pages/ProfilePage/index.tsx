import { TabLookingComponent } from 'components';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';
import UserMainInfo from './UserMainInfo';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Artworks } from './Tabs';

const tabs = [
  {
    title: 'My Artworks',
    icon: art,
  },
  {
    title: 'Collection',
    icon: folders,
  },
  {
    title: 'Favorited',
    icon: heart,
  },
  {
    title: 'About me',
    icon: me,
  },
];

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  return (
    <section className={s.page}>
      <UserMainInfo userId={userId} />

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
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
