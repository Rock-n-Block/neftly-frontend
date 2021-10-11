import { FC, memo, RefObject, useState } from 'react';
import s from './Collectibles.module.scss';
import { ArtCard } from 'components';
import { useFetchNft, useFilters, useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';

interface IProps {
  userId: string;
}

const Collectibles: FC<IProps> = memo(({ userId }) => {
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

      <div className={s.artworks}>
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
    </>
  );
});
export default Collectibles;
