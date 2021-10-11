import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import CollectionMainInfo from './CollectionMainInfo/index';
import { storeApi } from 'services/api';

import { H3, ArtCard, Button, TabLookingComponent } from 'components';

import s from './CollectionPage.module.scss';

import { folders, art } from 'assets/img';

const tabs = [
  {
    title: 'On sale',
    icon: art,
  },
  {
    title: 'Collectibles',
    icon: folders,
  },
];

const CollectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const [page, setPage] = useState(1);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokens, setTokens] = useState<any>([]);
  const { collectionId } = useParams<{ collectionId: string }>();
  const history = useHistory();
  const [collection, setCollection] = useState<{
    id: number | string;
    avatar: string;
    name?: string;
    address: string;
    cover: string;
    creator: any;
    tokens: Array<any>;
    description: string | null;
  }>({
    address: '',
    cover: '',
    id: '',
    avatar: '',
    name: '',
    tokens: [],
    creator: {},
    description: null,
  });

  const handleTabChange = (title: string) => {
    setActiveTab(title);
    setPage(1);
  };

  const getCollection = useCallback(() => {
    const refresh = page === 1;
    storeApi.getCollection(collectionId, page).then(({ data }: any) => {
      setCollection(data);
      setTotalTokens(data.tokens_count);
      if (refresh) {
        setTokens(data.tokens);
      } else {
        setTokens((prev: any) => [...prev, ...data.tokens]);
      }
      if (!data.tokens.length) {
        setTokens([]);
      }
    });
  }, [collectionId, page]);

  useEffect(() => {
    if (collectionId) {
      getCollection();
    } else {
      history.push('/');
    }
  }, [getCollection, collectionId, history]);

  return (
    <section className={s.page}>
      <div className={s.page_user}>
        <CollectionMainInfo
          cover={collection.cover}
          avatar={collection.avatar}
          name={collection.name}
          address={`${collection.address.slice(0, 14)}...${collection.address.slice(-4)}`}
          description={collection.description}
        />
      </div>

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            action={(value: string) => handleTabChange(value)}
          />
        </div>

        <div className={s.page_body__right}>
          <div className={s.page_body__top}>
            <div className={s.page_body__top_col}>
              <H3 className={s.title}>My Artworks</H3>
              <div className={s.counter}>{totalTokens} artwork created</div>
            </div>
          </div>

          <div className={s.page_body__artworks}>
            {activeTab === 'On sale'
              ? tokens
                  .filter((token: any) => token.selling)
                  .map((el: any) => {
                    const {
                      media,
                      name,
                      price,
                      highest_bid,
                      minimal_bid,
                      currency,
                      creator,
                      like_count,
                      available,
                    } = el;
                    return (
                      <ArtCard
                        key={name}
                        imageMain={media}
                        name={name}
                        price={price || highest_bid || minimal_bid}
                        asset={currency.symbol.toUpperCase()}
                        inStockNumber={available}
                        author={creator.name}
                        authorAvatar={creator.avatar}
                        likesNumber={like_count}
                      />
                    );
                  })
              : tokens.map((el: any) => {
                  const {
                    media,
                    name,
                    price,
                    highest_bid,
                    minimal_bid,
                    currency,
                    creator,
                    like_count,
                    available,
                  } = el;
                  return (
                    <ArtCard
                      key={name}
                      imageMain={media}
                      name={name}
                      price={price || highest_bid || minimal_bid}
                      asset={currency.symbol.toUpperCase()}
                      inStockNumber={available}
                      author={creator.name}
                      authorAvatar={creator.avatar}
                      likesNumber={like_count}
                    />
                  );
                })}
          </div>
          {tokens.length < totalTokens && (
            <div className={s.button_wrapper}>
              <Button className={s.button_more} color="outline" onClick={() => setPage(page + 1)}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectionPage;
