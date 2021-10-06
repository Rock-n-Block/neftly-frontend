import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { getTrackBackground, Range } from 'react-range';
import Slider from 'react-slick/lib/index';
import cn from 'classnames';
import { observer } from 'mobx-react';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Dropdown from '../../../components/Dropdown';
import Icon from '../../../components/Icon';
import Switch from '../../../components/Switch';
// data
// import { bids } from '../../../mocks/bids';
import { ratesApi, storeApi } from '../../../services/api';
import { useMst } from '../../../store';

import styles from './Discover.module.scss';

const dateOptions = [
  'Recently added',
  'Long added',
  'Most liked',
  'Less liked',
  'Most expensive',
  'Cheapest',
];
const creatorOptions = ['All', 'Verified only', 'Most liked'];

// TODO: убрать any
const SlickArrow: React.FC<any> = ({ children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

const Discover: React.FC = observer(() => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const [bids, setBids] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [navLinks, setNavLinks] = useState<any>([]);
  const [rates, setRates] = useState<Array<any>>([]);
  const [time, setTime] = useState<any>(null);
  const { user } = useMst();

  // const [values, setValues] = useState([5]);

  const [visible, setVisible] = useState(false);

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
    storeApi.getSearchResults({ text: searchStr, page: 1 }, queriesObject).then(({ data }) => {
      setBids(data);
    });
  }, []);

  const handleChange = (key: string, value: any) => {
    setQueries((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
    if (key === 'max_price') {
      if (time) {
        clearTimeout(time);
        setTime(setTimeout(() => fetchSearch({ ...queries, [key]: value }, user.search), 500));
      } else {
        setTime(setTimeout(() => fetchSearch({ ...queries, [key]: value }, user.search), 500));
      }
    } else {
      fetchSearch({ ...queries, [key]: value }, user.search);
    }
  };

  // const handleReset = () => {
  //   setQueries((prevState: any) => ({
  //     ...prevState,
  //     type: 'items',
  //     on_sale: false,
  //     is_verified: creatorOptions[0],
  //     order_by: dateOptions[0],
  //     tags: navLinks[0],
  //   }));
  //   setValues([5]);
  //   setSearch('');
  //   setIsLoading(true);
  // };

  const fetchSearchPage = useCallback(() => {
    storeApi.getSearchResults({ text: user.search || '', page }, queries).then(({ data }) => {
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
    if (user.is_searching) {
      fetchSearch(queries, user.search);
    }
    // eslint-disable-next-line
  }, [queries, user.is_searching, user.search]);

  useEffect(() => {
    fetchSearch(queries, user.search);
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 100000,
        settings: 'unslick',
      },
    ],
  };

  return (
    <div className={cn('section', styles.section)}>
      <div className={cn('container', styles.container)}>
        <h3 className={cn('h3', styles.title)}>Discover</h3>
        <div className={styles.top}>
          <div className={styles.switchWrapper}>
            <Switch
              className={styles.switch}
              value={queries.on_sale}
              setValue={() => handleChange('on_sale', !queries.on_sale)}
            />
            <div className={styles.switchLabel}>Show placed bids only</div>
          </div>
          <div className={styles.nav}>
            {navLinks.map((x: any) => (
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
          <button
            type="button"
            className={cn(styles.filter, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <div className={styles.text}>Filter</div>
            <div className={styles.toggle}>
              <Icon name="filter" size="18" />
              <Icon name="close" size="10" />
            </div>
          </button>
        </div>
        <div className={cn(styles.filters, { [styles.active]: visible })}>
          <div className={styles.sorting}>
            <div className={styles.cell}>
              <div className={styles.label}>creator</div>
              <Dropdown
                className={styles.dropdown}
                value={queries.is_verified}
                setValue={(value: any) => handleChange('is_verified', value)}
                options={creatorOptions}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>Currency</div>
              <Dropdown
                className={styles.dropdown}
                value={queries.currency}
                setValue={(value: any) => handleChange('currency', value)}
                options={rates}
                isWithImage
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>Other</div>
              <Dropdown
                className={styles.dropdown}
                value={queries.order_by}
                setValue={(value: any) => handleChange('order_by', value)}
                options={dateOptions}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.label}>Price range</div>
              <Range
                values={queries.max_price}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(value) => handleChange('max_price', value)}
                renderTrack={({ props, children }) => (
                  <div
                    role="button"
                    tabIndex={0}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '27px',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '16px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values: queries.max_price,
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
          </div>
        </div>
        <div className={styles.list}>
          {bids.length ? (
            <Slider className={cn('discover-slider', styles.slider)} {...settings}>
              {bids.map((x) => (
                <Card className={styles.card} item={x} key={nextId()} />
              ))}
            </Slider>
          ) : (
            <div className={styles.nobids}>
              <span className="h4">No mathes</span>
            </div>
          )}
        </div>
        <div className={styles.btns}>
          <Button
            onClick={() => setPage(page + 1)}
            className={cn('button-stroke button-small', styles.button)}
          >
            <span>Load more</span>
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Discover;
