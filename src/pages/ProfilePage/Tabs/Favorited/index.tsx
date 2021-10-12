import { FC, memo, RefObject, useState } from 'react';
import s from '../Tabs.module.scss';
import { ArtCard } from 'components';
import { useFetchLiked, useFilters, useInfiniteScroll } from 'hooks';
import TabHeader from '../TabHeader';

interface IProps {
  userAddress: string;
}

const Favorited: FC<IProps> = memo(
  ({ userAddress = '0xc78cd789d1483189c919a8d4dd22004cfd867eb4' }) => {
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
  },
);
export default Favorited;
