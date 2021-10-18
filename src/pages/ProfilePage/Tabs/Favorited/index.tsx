import { FC, memo, RefObject, useState } from 'react';
import s from '../Tabs.module.scss';
import { ArtCard } from 'components';
import { useFetchLiked, useFilters, useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';
import BigNumber from 'bignumber.js';

interface IProps {
  userAddress: string;
  likeAction: (id: string | number) => void;
}

const Favorited: FC<IProps> = memo(({ userAddress, likeAction }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { page, handlePage } = useFilters(setIsLoading);

  const { allPages, totalItems, nftCards } = useFetchLiked({
    setLoading: setIsLoading,
    page,
    address: userAddress,
  });
  const anchorRef = useInfiniteScroll(page, allPages, handlePage, isLoading);

  return (
    <>
      <TabHeader title={`${totalItems} artworks owned`} />

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
          const artPrice = price || (highest_bid && new BigNumber(highest_bid.amount).toFixed()) || minimal_bid
          return (
            <ArtCard
              artId={id}
              key={name}
              imageMain={media}
              name={name}
              price={artPrice}
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
export default Favorited;
