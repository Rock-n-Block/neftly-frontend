import { FC, memo, RefObject, useState } from 'react';
import s from '../Tabs.module.scss';
import { ArtCard } from 'components';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';

interface IProps {
  userId: string;
}

const Artworks: FC<IProps> = memo(({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { orderByFilter, handleOrderByFilter, page, handlePage } = useFilters(setIsLoading);

  const { allPages, totalItems, nftCards } = useFetchNft({
    setLoading: setIsLoading,
    page,
    sort: 'items',
    creator: userId,
    order_by: orderByFilter.value,
  });
  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading);

  return (
    <>
      <TabHeader
        title={`${totalItems} artwork created`}
        orderByFilter={orderByFilter}
        handleOrderByFilter={handleOrderByFilter}
      />

      <div className={s.tab}>
        {nftCards.map((artCard: any) => {
          const { media, name, price, currency, available, creator, like_count, tags } = artCard;
          return (
            <ArtCard
              key={name}
              imageMain={media}
              name={name}
              price={price}
              asset={currency.symbol.toUpperCase()}
              inStockNumber={available}
              author={creator.name}
              authorAvatar={creator.avatar}
              likesNumber={like_count}
              tags={tags}
            />
          );
        })}
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
      {/* <div className={s.button_wrapper}>
        <Button className={s.button_more} color="outline">
          Load More
        </Button>
      </div> */}
    </>
  );
});
export default Artworks;
