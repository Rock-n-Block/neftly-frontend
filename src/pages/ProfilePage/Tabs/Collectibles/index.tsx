import { FC, memo, RefObject, useState } from 'react';
import s from '../Tabs.module.scss';
import { ArtCard } from 'components';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';
import BigNumber from 'bignumber.js';

interface IProps {
  userId: string;
  likeAction: (id: string | number) => void;
}

const Collectibles: FC<IProps> = memo(({ userId, likeAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { orderByFilter, handleOrderByFilter, page, handlePage } = useFilters(setIsLoading);

  const { allPages, totalItems, nftCards } = useFetchNft({
    setLoading: setIsLoading,
    page,
    sort: 'items',
    owner: userId,
    order_by: orderByFilter.value,
  });

  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading);

  return (
    <>
      <TabHeader
        title={`${totalItems} artworks owned`}
        orderByFilter={orderByFilter}
        handleOrderByFilter={handleOrderByFilter}
      />

      <div className={s.tab}>
        {nftCards.map((artCard: any) => {
          const {
            media,
            name,
            price,
            currency,
            available,
            creator,
            like_count,
            tags,
            id,
            highest_bid,
            minimal_bid,
            bids,
            is_liked,
          } = artCard;
          return (
            <ArtCard
              artId={id}
              key={name}
              imageMain={media}
              name={name}
              price={
                price || (highest_bid && new BigNumber(highest_bid.amount).toFixed()) || minimal_bid
              }
              asset={currency.symbol.toUpperCase()}
              inStockNumber={available}
              author={creator.name}
              authorAvatar={creator.avatar}
              likesNumber={like_count}
              tags={tags}
              bids={bids}
              isLiked={is_liked}
              likeAction={likeAction}
            />
          );
        })}
      </div>
      <div ref={anchorRef as RefObject<HTMLDivElement>} />
    </>
  );
});
export default Collectibles;
