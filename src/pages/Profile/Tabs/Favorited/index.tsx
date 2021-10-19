import { FC, memo, RefObject } from 'react';

import { ArtCard } from 'components';
import { toFixed } from 'utils';
import { useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';
import { INft } from 'typings';

import s from '../Tabs.module.scss';

interface IProps {
  likeAction: (id: string | number) => void;
  page: number;
  handlePage: (value: number) => void;
  isFiltersLoading: boolean;
  allPages: number;
  isLickesLoading: boolean;
  totalItems: number;
  nftCards: INft[];
}

const Favorited: FC<IProps> = memo(
  ({
    likeAction,
    page,
    handlePage,
    isFiltersLoading,
    allPages,
    isLickesLoading,
    totalItems,
    nftCards,
  }) => {
    const anchorRef = useInfiniteScroll(
      page,
      allPages,
      handlePage,
      isFiltersLoading || isLickesLoading,
    );

    return (
      <>
        <TabHeader title={`${totalItems} artworks liked`} />

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
                key={name}
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
  },
);
export default Favorited;
