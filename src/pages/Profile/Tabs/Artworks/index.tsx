import { FC, RefObject } from 'react';
import { ArtCard } from 'components';
import { useInfiniteScroll } from 'hooks';
import { INft, OptionType } from 'typings';
// import { toFixed } from 'utils';

import TabHeader from '../TabHeader';

import s from '../Tabs.module.scss';

interface IProps {
  likeAction: (id: string | number) => Promise<any>;
  page: number;
  allPages: number;
  handlePage: (value: number) => void;
  isFiltersLoading: boolean;
  isNftsLoading: boolean;
  totalItems: number;
  orderByFilter: OptionType;
  handleOrderByFilter: (value: OptionType) => void;
  nftCards: INft[];
}

const Artworks: FC<IProps> = ({
  likeAction,
  page,
  allPages,
  handlePage,
  isFiltersLoading,
  isNftsLoading,
  totalItems,
  orderByFilter,
  handleOrderByFilter,
  nftCards,
}) => {
  const anchorRef = useInfiniteScroll(
    page,
    allPages,
    handlePage,
    isFiltersLoading || isNftsLoading,
  );

  return (
    <>
      <TabHeader
        title={`${totalItems} artwork${totalItems !== 1 ? 's' : ''}`}
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
          const artPrice = price || (highest_bid && highest_bid.amount) || minimal_bid;
          return (
            <ArtCard
              artId={id}
              key={id}
              imageMain={media}
              name={name}
              price={artPrice}
              asset={currency.symbol.toUpperCase()}
              inStockNumber={available}
              author={creator.name}
              authorAvatar={creator.avatar}
              authorId={creator.id}
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
};
export default Artworks;
