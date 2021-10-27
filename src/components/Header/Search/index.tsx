import { useCallback, useState, VFC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import cx from 'classnames';
import { Button, H5, Text, TextInput } from 'components';
import Loader from 'components/Loader';
import { useFetchNft } from 'hooks';
import { INft } from 'typings';

import { SearchTag } from './components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  classNameDropdown?: string;
  isDesktop?: boolean;
};

const Search: VFC<Props> = ({ isDesktop = true, className, classNameDropdown }) => {
  const [inputValue, setInputValue] = useState('');
  // TODO: check if pagination needed, if not delete
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResultPage, setSearchResultPage] = useState(1);

  const [, totalItems, nftCards, isLoading, debouncedFetch] = useFetchNft(
    {
      text: inputValue,
      page: searchResultPage,
    },
    true,
  );

  const handleInput = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValue(value);
      debouncedFetch(value);
    },
    [debouncedFetch],
  );

  const isShowResults = totalItems > 0 && inputValue !== '';
  const isNoResults = totalItems === 0 && inputValue !== '' && !isLoading;

  return (
    <div className={cx(styles.search, { [styles.desktop]: isDesktop }, className)}>
      <TextInput onChange={handleInput} value={inputValue} placeholder="Search" type="text" />
      {isLoading && <Loader className={styles.searchLoader} />}
      <div
        className={cx(
          styles.searchDropdown,
          { [styles.isVisible]: isShowResults },
          classNameDropdown,
        )}
      >
        {isShowResults && (
          <>
            <H5>{`Artwork (${totalItems})`}</H5>
            {nftCards.map((nft: INft) => {
              const {
                media,
                name,
                price,
                currency: { symbol },
                total_supply,
                is_auc_selling,
                id,
              } = nft;
              return (
                <Link to={routes.nft.link(id)} onClick={() => setInputValue('')}>
                  <SearchTag
                    image={media}
                    title={name}
                    price={price}
                    asset={symbol}
                    isAuction={is_auc_selling}
                    inStock={total_supply}
                  />
                </Link>
              );
            })}
            <Button color="transparent" onClick={() => alert('view result')}>
              <Text>View result</Text>
            </Button>
          </>
        )}
        {isNoResults && <H5>No search results</H5>}
      </div>
    </div>
  );
};

export default Search;
