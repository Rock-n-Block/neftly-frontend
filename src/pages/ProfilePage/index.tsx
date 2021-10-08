import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { IExtendedInfo } from 'typings';
import { userApi } from 'services/api';
import { useMst } from 'store';

import { H3, ArtCard, Button, Select, TabLookingComponent } from 'components';
import { data as dataMock } from './CardsMock';

import s from './ProfilePage.module.scss';

import { folders, art, me, heart } from 'assets/img';
import UserMainInfo from './UserMainInfo';

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
  const { userId } = useParams<{ userId: string }>();
  const { user } = useMst();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shownUser, setShownUser] = useState<IExtendedInfo>({
    address: '',
    cover: '',
    id: 0,
    avatar: '',
    display_name: '',
    followers: [],
    followers_count: 0,
    follows_count: 0,
    twitter: null,
    instagram: null,
    facebook: null,
    site: null,
    bio: null,
    is_verificated: false,
    custom_url: '',
    follows: [],
  });

  const getUser = useCallback(() => {
    userApi.getUser({ id: userId }).then(({ data }: any) => setShownUser(data));
  }, [userId]);

  const handleUpload = (file: any) => {
    setIsLoading(true);
    const fileData = new FormData();
    fileData.append('cover', file);
    userApi
      .setUserCover(fileData)
      .then(({ data }) => {
        setIsLoading(false);
        user.setCover(data);
        getUser();
      })
      .catch((err) => {
        console.log(err, 'set cover');
      });
  };

  useEffect(() => {
    if (userId) {
      getUser();
    } else {
      history.push('/');
    }
  }, [getUser, userId, history]);
  const handleFilterOne = useCallback((value) => {
    setFilterOne(value);
  }, []);

  const [filterTwo, setFilterTwo] = useState(selectOptionsTwo[0]);
  const handleFilterTwo = useCallback((value) => {
    setFilterTwo(value);
  }, []);

  return (
    <section className={s.page}>
      <UserMainInfo handleUpload={handleUpload} isLoading={isLoading} shownUser={shownUser} />

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
            {dataMock.map((el) => (
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
