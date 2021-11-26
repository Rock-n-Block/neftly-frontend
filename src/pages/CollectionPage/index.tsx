import { useState } from 'react';
import { useParams } from 'react-router';

import CollectionMainInfo from './CollectionMainInfo/index';

import { H3, ArtCard, Button, Loader } from 'components';

import s from './CollectionPage.module.scss';

import { folders, art } from 'assets/img';
import { useFetchCollection, useTabs } from 'hooks';
import { useLocation } from 'react-router-dom';

const tabs = [
  {
    title: 'On sale',
    key: 'sale',
    icon: art,
  },
  {
    title: 'Collectibles',
    key: 'collectibles',
    icon: folders,
  },
];

const CollectionPage: React.FC = () => {
  const initialTab = useLocation().search?.replace('?tab=', '') || '';
  const { activeTab } = useTabs(tabs, initialTab);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { collectionId } = useParams<{ collectionId: string }>();

  const { totalTokens, collection, tokens } = useFetchCollection(
    setIsLoading,
    page,
    collectionId,
    activeTab,
  );

  return (
    <section className={s.page}>
      <div className={s.page_user}>
        <CollectionMainInfo
          cover={collection.avatar}
          avatar={collection.avatar}
          name={collection.name}
          address={collection.address}
          description={collection.description}
        />
      </div>

      <div className={s.page_body}>
        {/* <div className={s.page_body__left}>
          <div className={s.subtitle}>Menu</div>
          <TabLookingComponent
            className={s.tabs}
            tabs={tabs}
            activeTab={activeTab}
            action={setActiveTab}
          />
        </div> */}

        <div className={s.page_body__right}>
          <div className={s.page_body__top}>
            <div className={s.page_body__top_col}>
              <H3 className={s.title}>Artworks</H3>
              <div className={s.counter}>{totalTokens} artwork created</div>
            </div>
          </div>

          <div className={s.page_body__artworks}>
            {tokens.length
              ? tokens.map((el: any) => {
                  const {
                    id,
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
                      artId={id}
                      key={id}
                      imageMain={media}
                      name={name}
                      price={price || highest_bid || minimal_bid}
                      asset={currency.symbol.toUpperCase()}
                      inStockNumber={available}
                      author={creator.name}
                      authorAvatar={creator.avatar}
                      authorId={creator.id}
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
