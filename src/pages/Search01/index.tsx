import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { getTrackBackground, Range } from 'react-range';
import cn from 'classnames';

// import { ReactComponent as AllColors } from '../../assets/img/icons/all-colors.svg';
// import { ReactComponent as Black } from '../../assets/img/icons/black.svg';
// import { ReactComponent as Green } from '../../assets/img/icons/green.svg';
// import { ReactComponent as Pink } from '../../assets/img/icons/pink.svg';
// import { ReactComponent as Purple } from '../../assets/img/icons/purple.svg';
import { ReactComponent as Cross } from '../../assets/img/icons/cross-gradient.svg';
import Card from '../../components/Card';
import Checkbox from '../../components/Checkbox';
import Dropdown from '../../components/Dropdown';
import Icon from '../../components/Icon';
// import { bids } from '../../mocks/bids';
import { ratesApi, storeApi } from '../../services/api';

import styles from './Search01.module.scss';

const dateOptions = [
  'Recently added',
  'Long added',
  'Most liked',
  'Less liked',
  'Most expensive',
  'Cheapest',
];
// const likesOptions = ['Most liked', 'Least liked'];
// const colorOptions = [
//   { icon: <AllColors />, text: 'All colors' },
//   { icon: <Black />, text: 'Black' },
//   { icon: <Green />, text: 'Green' },
//   { icon: <Pink />, text: 'Pink' },
//   { icon: <Purple />, text: 'Purple' },
// ];
const creatorOptions = ['All', 'Verified only', 'Unverified only'];

const Search: React.FC = () => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [date, setDate] = useState(dateOptions[0]);
  // const [likes, setLikes] = useState(likesOptions[0]);
  // const [color, setColor] = useState(colorOptions[0].text);
  // const [creator, setCreator] = useState(creatorOptions[0]);
  const [bids, setBids] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [time, setTime] = useState<any>(null);
  const [navLinks, setNavLinks] = useState<any>([]);
  const [rates, setRates] = useState<Array<any>>([]);

  const [search, setSearch] = useState('');

  const [queries, setQueries] = useState({
    type: 'items',
    on_sale: false,
    is_verified: creatorOptions[0],
    order_by: dateOptions[0],
    tags: '',
    max_price: [5],
    currency: 'weth',
  });

  const fetchTags = useCallback(async () => {
    const links = await storeApi.getTags();
    setNavLinks(['All items'].concat(links.data.tags));
    setQueries((prevState: any) => ({
      ...prevState,
      tags: 'All items',
    }));
  }, []);

  const fetchSearch = useCallback((queriesObject: any, searchStr: string) => {
    if (searchStr)
      storeApi.getSearchResults(queriesObject).then(({ data }) => {
        setBids(data);
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchSearch(queries, search);
  };

  const handleChange = (key: string, value: any) => {
    setQueries((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
    if (key === 'max_price') {
      if (time) {
        clearTimeout(time);
        setTime(setTimeout(() => fetchSearch({ ...queries, [key]: value }, search), 500));
      } else {
        setTime(setTimeout(() => fetchSearch({ ...queries, [key]: value }, search), 500));
      }
    } else {
      fetchSearch({ ...queries, [key]: value }, search);
    }
  };

  const handleReset = () => {
    setQueries((prevState: any) => ({
      ...prevState,
      type: 'items',
      on_sale: false,
      is_verified: creatorOptions[0],
      order_by: dateOptions[0],
      tags: navLinks[0],
      max_price: [5],
      currency: 'weth',
    }));
    setSearch('');
    fetchSearch(
      {
        ...queries,
        type: 'items',
        on_sale: false,
        is_verified: creatorOptions[0],
        order_by: dateOptions[0],
        tags: navLinks[0],
        max_price: [5],
        currency: 'weth',
      },
      '',
    );
  };

  const fetchSearchPage = useCallback(() => {
    storeApi.getSearchResults(queries).then(({ data }) => {
      setBids(bids.concat(data));
    });
    // eslint-disable-next-line
  }, [page]);

  const fetchRates = useCallback(() => {
    ratesApi.getRates().then(({ data }: any) => {
      setRates(data);
    });
  }, []);

  useEffect(() => {
    fetchSearch(queries, search);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page !== 1) {
      fetchSearchPage();
    }
  }, [fetchSearchPage, page]);

  useEffect(() => {
    fetchTags();
    fetchRates();
  }, [fetchTags, fetchRates]);

  const STEP = 0.1;
  const MIN = 0;
  const MAX = 10;

  return (
    <div className={cn('section-pt80', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Type your keywords</div>
          <form className={styles.search} action="" onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                fetchSearch(queries, e.target.value);
              }}
              name="search"
              placeholder="Search ..."
              required
            />
            <button type="submit" className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={queries.order_by}
              setValue={(value: any) => handleChange('order_by', value)}
              options={dateOptions}
            />
          </div>
          <div className={styles.nav}>
            {navLinks.length &&
              navLinks.map((x: any) => (
                <button
                  type="button"
                  className={cn(styles.link, {
                    [styles.active]: x === queries.tags,
                  })}
                  onClick={(e: any) => handleChange('tags', e.target.innerHTML)}
                  key={nextId()}
                >
                  {x}
                </button>
              ))}
          </div>
        </div>
        <Checkbox
          className={styles.checkbox}
          content="Show placed bids only"
          value={queries.on_sale}
          onChange={() => handleChange('on_sale', !queries.on_sale)}
        />
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.range}>
              <div className={styles.label}>Price range</div>
              <Range
                values={queries.max_price}
                // values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(value) => handleChange('max_price', value)}
                renderTrack={({ props, children }) => (
                  <div
                    role="button"
                    onKeyDown={() => {}}
                    tabIndex={0}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '8px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values: queries.max_price,
                          // values,
                          colors: [`#6F45FF, #FF6365 ${queries.max_price[0] * 10}%`, '#353945'],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: 'center',
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '24px',
                      width: '24px',
                      borderRadius: '50%',
                      background: 'linear-gradient(90deg, #6F45FF 0%, #FF6365 100%)',
                      border: '4px solid #FCFCFD',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-33px',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        fontFamily: 'Poppins',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        backgroundColor: '#141416',
                      }}
                    >
                      {queries.max_price[0].toFixed(1)}
                    </div>
                  </div>
                )}
              />
              <div className={styles.scale}>
                <div className={styles.number}>0.01 {queries.currency.toUpperCase()}</div>
                <div className={styles.number}>10 {queries.currency.toUpperCase()}</div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>Creator</div>
                <Dropdown
                  className={styles.dropdown}
                  value={queries.is_verified}
                  setValue={(value: any) => handleChange('is_verified', value)}
                  options={creatorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Currency</div>
                <Dropdown
                  className={styles.dropdown}
                  value={queries.currency}
                  setValue={(value: any) => handleChange('currency', value)}
                  options={rates}
                  isWithImage
                />
              </div>
            </div>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              onClick={handleReset}
              className={styles.reset}
            >
              <Cross />
              <span>Reset filter</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {bids.map((x) => (
                <Card className={styles.card} item={x} key={nextId()} />
              ))}
            </div>
            <div className={styles.btns}>
              <button
                type="button"
                tabIndex={0}
                onKeyDown={() => {}}
                className={cn('button-stroke', styles.button)}
                onClick={() => setPage(+page + 1)}
              >
                <span>Load more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
