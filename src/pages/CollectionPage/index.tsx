import { useState } from 'react';
import { useParams } from 'react-router';

import CollectionMainInfo from './CollectionMainInfo/index';

import { H3, ArtCard, Button, TabLookingComponent, Loader } from 'components';

import s from './CollectionPage.module.scss';

import { folders, art } from 'assets/img';
import { sliceString } from 'utils';
import { useFetchCollection } from 'hooks';

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
  const [isLoading, setIsLoading] = useState(false);
  const { collectionId } = useParams<{ collectionId: string }>();

  const { totalTokens, collection, tokens } = useFetchCollection(setIsLoading, page, collectionId);

  const handleTabChange = (title: string) => {
    setActiveTab(title);
    setPage(1);
  };

  return (
    <section className={s.page}>
      <div className={s.page_user}>
        <CollectionMainInfo
          cover={collection.cover}
          avatar={collection.avatar}
          name={collection.name}
          address={sliceString(collection.address)}
          description={collection.description}
        />
      </div>

      <div className={s.page_body}>
        <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent className={s.tabs} tabs={tabs} action={handleTabChange} />
        </div>

        <div className={s.page_body__right}>
          <div className={s.page_body__top}>
            <div className={s.page_body__top_col}>
              <H3 className={s.title}>My Artworks</H3>
              <div className={s.counter}>{totalTokens} artwork created</div>
            </div>
          </div>

          <div className={s.page_body__artworks}>
            {tokens.length
              ? [
                  ...(activeTab === 'On sale'
                    ? tokens.filter((token: any) => token.selling)
                    : tokens),
                ].map((el: any) => {
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
              : null}
          </div>
          {tokens.length < totalTokens && (
            <div className={s.button_wrapper}>
              {isLoading ? (
                <Loader className={s.loader} />
              ) : (
                <Button className={s.button_more} color="outline" onClick={() => setPage(page + 1)}>
                  Load More
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectionPage;