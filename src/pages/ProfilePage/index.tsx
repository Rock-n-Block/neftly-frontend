import { useState, useCallback } from 'react';

import UserMainInfo from './UserMainInfo/index';

import { H3, ArtCard, Button, Select, TabLookingComponent } from 'components';
import { data } from './CardsMock';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';

const selectOptions = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Featured',
    value: 'featured',
  },
  {
    label: 'Rare',
    value: 'rare',
  },
];

const selectOptionsTwo = [
  {
    label: 'Hot',
    value: 'hot',
  },
  {
    label: 'Featured',
    value: 'featured',
  },
  {
    label: 'Rare',
    value: 'rare',
  },
];
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
  const [filterOne, setFilterOne] = useState(selectOptions[0]);
  const handleFilterOne = useCallback((value) => {
    setFilterOne(value);
  }, []);

  const [filterTwo, setFilterTwo] = useState(selectOptionsTwo[0]);
  const handleFilterTwo = useCallback((value) => {
    setFilterTwo(value);
  }, []);

  return (
    <section className={s.page}>
      <div className={s.page_user}>
        <UserMainInfo />
      </div>

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent className={s.tabs} tabs={tabs} action={() => {}} />
        </div>

        <div className={s.page_body__right}>
          <div className={s.page_body__top}>
            <div className={s.page_body__top_col}>
              <H3 className={s.title}>My Artworks</H3>
              <div className={s.counter}>3.456 artwork created</div>
            </div>
            <div className={s.page_body__top_sorters}>
              <Select onChange={handleFilterOne} value={filterOne} options={selectOptions} />
              <Select onChange={handleFilterTwo} value={filterTwo} options={selectOptionsTwo} />
            </div>
          </div>

          <div className={s.page_body__artworks}>
            {data.map((el) => (
              <ArtCard
                key={`${el.inStockNumber}-${el.author}-${el.price}`}
                {...el}
                imageMain={el.image}
              />
            ))}
          </div>
          <div className={s.button_wrapper}>
            <Button className={s.button_more} color="outline">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
