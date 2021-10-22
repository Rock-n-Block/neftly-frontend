import { FC, RefObject } from 'react';

import { ArtCard } from 'components';
import { useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';
import { OptionType, INft } from 'typings';
import { toFixed } from 'utils';

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
  activeTab: string;
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
  activeTab,
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
        title={`${totalItems} artwork ${activeTab === 'collectibles' ? 'owned' : 'created'}`}
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
          const artPrice = price || (highest_bid && toFixed(highest_bid.amount)) || minimal_bid;
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
