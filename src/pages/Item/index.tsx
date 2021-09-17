import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { observer } from 'mobx-react';

import { storeApi } from '../../services/api';
import { useMst } from '../../store/store';
import { IBaseInfo, IOwner } from '../../typings/UserInfo';

import Control from './Control';
import Options from './Options';
import Users from './Users';

import styles from './Item.module.scss';

const navLinks = ['Info', 'Owners', 'History', 'Bids'];

interface IItemId {
  itemId: string;
}

interface ICurrency {
  image: string;
  name: string;
  rate: string;
  symbol: string;
}

interface IHistoryItem {
  avatar: string;
  date: string;
  id: number;
  method: string;
  name: string;
  price: null | string;
}

// TODO: change any
export interface IItem {
  USD_price: number;
  available: number;
  bids: any[];
  collection: IBaseInfo;
  creator: IBaseInfo;
  currency: ICurrency;
  description: string;
  details: null | any;
  highest_bid: null | any;
  history: IHistoryItem[];
  id: number;
  internal_id: number;
  is_auc_selling: boolean;
  is_liked: boolean;
  is_selling: boolean;
  like_count: number;
  media: string;
  minimal_bid: string | null;
  name: string;
  owner_auction: any[];
  owners: IOwner | IOwner[];
  price: number;
  royalty: number;
  sellers: any[];
  selling: boolean;
  service_fee: number;
  standart: 'ERC721' | 'ERC1155';
  tags: any[];
  total_supply: number;
  updated_at: number;
  format: string;
  animation: string;
}

const categories = [
  {
    category: 'black',
    content: 'art',
  },
  {
    category: 'purple',
    content: 'unlockable',
  },
];

const Item: React.FC = observer(() => {
  const { itemId } = useParams<IItemId>();
  const [activeIndex, setActiveIndex] = useState(0);
  // const [itemId, setItemId] = useState('');
  const [item, setItem] = useState<IItem | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useMst();
  const [isMayRemoveFromSale, setMayRemoveFromSale] = useState<boolean>(false);

  const checkIsOwner = useCallback(() => {
    if (item && item.owners) {
      if (Array.isArray(item.owners)) {
        setIsOwner(!!item.owners.find((owner: IOwner) => owner.id === user.id));
      } else {
        setIsOwner(user.id === item.owners.id);
      }
    }
  }, [item, user.id]);

  const getItem = useCallback(() => {
    storeApi
      .getToken(itemId)
      .then(({ data }) => setItem(data))
      .catch((err) => console.error(err));
  }, [itemId]);

  const removeFromSale = useCallback(async () => {
    if (itemId && item) {
      const data: {
        price?: null;
        minimal_bid?: null;
      } = {};
      if (item.standart === 'ERC721' && isOwner) {
        if (item.is_selling) {
          data.price = null;
        }
        if (item.is_auc_selling) {
          data.minimal_bid = null;
        }
      } else if (item.standart === 'ERC1155' && isOwner) {
        if (item.is_selling && item.sellers.find((seller) => seller.id === user.id)) {
          data.price = null;
        }
        if (item.is_auc_selling && item.owner_auction.find((seller) => seller.id === user.id)) {
          data.minimal_bid = null;
        }
      }
      try {
        const { data: result } = await storeApi.removeFromSale(
          itemId,
          data.price,
          data.minimal_bid,
        );
        setItem(result);
      } catch (error) {
        console.log(error, 'remove from sale');
      }
    }
  }, [itemId, item, isOwner, user.id, setItem]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  useEffect(() => checkIsOwner(), [checkIsOwner]);
  useEffect(() => {
    if (item && user.id) {
      setMayRemoveFromSale(
        (item.standart === 'ERC721' && item.is_selling && isOwner) ||
          (item.standart === 'ERC1155' &&
            (item.sellers.find((seller) => seller.id === user.id) ||
              item.owner_auction.find((seller) => seller.id === user.id)) &&
            isOwner),
      );
    }
  }, [item, isOwner, user.id]);
  // const getImage = (url: string) => {
  //   let result;
  //   if (url.slice(0, url.indexOf('/')) === 'data:image') {
  //     result = (
  //       <img
  //         // srcSet="/images/content/card-pic-6.jpg"
  //         src={url}
  //         alt="Card"
  //       />
  //     );
  //   }
  //   if (url.slice(0, url.indexOf('/')) === 'data:video') {
  //     result = (
  //       <video controls>
  //         <source src={url} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
  //         <track kind="captions" />
  //       </video>
  //     );
  //   }
  //   return result;
  // };
  return (
    <>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x) => (
                  <div
                    className={cn(
                      { 'status-black': x.category === 'black' },
                      { 'status-purple': x.category === 'purple' },
                      styles.category,
                    )}
                    key={nextId()}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              {item?.format === 'image' && (
                <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
              )}
              {item?.format === 'video' &&
                (item.animation ? (
                  <video controls>
                    <source
                      src={item.animation}
                      type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                    />
                    <track kind="captions" />
                  </video>
                ) : (
                  <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
                ))}
              {item?.format === 'audio' &&
                (item.animation ? (
                  <>
                    <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
                    <audio controls>
                      <source
                        src={item.animation}
                        // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                      />
                      <track kind="captions" />
                    </audio>
                  </>
                ) : (
                  <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
                ))}
            </div>
            <Options
              className={styles.optionsMobile}
              isLiked={item?.is_liked ?? false}
              isMayRemoveFromSale={isMayRemoveFromSale}
              isOwner={isOwner}
              isAuction={item?.is_auc_selling || false}
              removeFromSale={removeFromSale}
            />
          </div>
          <div className={styles.details}>
            <h1 className={cn('h3', styles.title)}>{item?.name}</h1>
            {item?.price ? (
              <div className={styles.cost}>
                <div className={cn('status-stroke-gradient', styles.price)}>
                  <div className={styles.inner}>
                    <span className="text-gradient">
                      {item.price} {item.currency.name}
                    </span>
                  </div>
                </div>
                <div className={cn('status-stroke-black', styles.price)}>${item.USD_price}</div>
                <div className={styles.counter}>{item.available} in stock</div>
              </div>
            ) : (
              ''
            )}
            <div className={styles.info}>
              {item?.description}{' '}
              {/* <a href='https://ui8.net' target='_blank' rel='noopener noreferrer'>
                https://ui8.net
              </a> */}
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  type="button"
                  className={cn({ [styles.active]: index === activeIndex }, styles.link)}
                  onClick={() => setActiveIndex(index)}
                  key={nextId()}
                >
                  {x}
                </button>
              ))}
            </div>
            <Users
              className={styles.users}
              owners={activeIndex === 0 || activeIndex === 1 ? item?.owners : undefined}
              creator={activeIndex === 0 ? item?.creator : undefined}
              history={activeIndex === 2 ? item?.history : undefined}
              bids={activeIndex === 3 ? item?.bids : undefined}
            />
            {item && (item?.is_selling || item?.is_auc_selling || isOwner) ? (
              <Control className={styles.control} token={item} updateTokenData={getItem} />
            ) : (
              ''
            )}
          </div>
          <Options
            className={styles.options}
            itemId={itemId}
            standart={item?.standart}
            isLiked={item?.is_liked ?? false}
            isMayRemoveFromSale={isMayRemoveFromSale}
            removeFromSale={removeFromSale}
            isOwner={isOwner}
            isAuction={item?.is_auc_selling || false}
          />
        </div>
      </div>
    </>
  );
});

export default Item;
