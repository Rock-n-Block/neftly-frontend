import { useCallback, useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import Slider from 'react-slick/lib/index';
import cn from 'classnames';
import { Text } from 'components';
import { observer } from 'mobx-react';

import Button from '../../../components/Button';
import Connect from '../../../components/Connect';
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import Player from '../../../components/Player';
import { storeApi } from '../../../services/api';

import styles from './Hero.module.scss';
// import Bid from "../../../components/Bid";

// const items = [
//   {
//     title: 'the creator network®',
//     creator: 'Enrico Cole',
//     currency: '1.00 ETH',
//     price: '$3,618.36',
//     avatar: '/images/content/avatar-creator.jpg',
//     image: '/images/content/video-preview.jpg',
//     image2x: '/images/content/video-preview@2x.jpg',
//     id: 9
//   },
//   {
//     title: 'Marco carrillo®',
//     creator: 'Enrico Cole',
//     currency: '2.00 ETH',
//     price: '$2,477.92',
//     avatar: '/images/content/avatar-creator.jpg',
//     image: '/images/content/video-preview.jpg',
//     image2x: '/images/content/video-preview@2x.jpg',
//     id: 10
//   },
//   {
//     title: 'the creator network®',
//     creator: 'Enrico Cole',
//     currency: '1.00 ETH',
//     price: '$3,618.36',
//     avatar: '/images/content/avatar-creator.jpg',
//     image: '/images/content/video-preview.jpg',
//     image2x: '/images/content/video-preview@2x.jpg',
//     id: 11
//   },
//   {
//     title: 'Marco carrillo®',
//     creator: 'Enrico Cole',
//     currency: '2.00 ETH',
//     price: '$2,477.92',
//     avatar: '/images/content/avatar-creator.jpg',
//     image: '/images/content/video-preview.jpg',
//     image2x: '/images/content/video-preview@2x.jpg',
//     id: 12
//   },
// ];

// TODO: убрать any
const SlickArrow: React.FC<any> = ({ children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

const Hero: React.FC = observer(() => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
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
  };

  const [visibleModalBid, setVisibleModalBid] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    const { data } = await storeApi.getFavorites();
    setFavorites(data);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      <div className={cn('section', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.head}>
            <div className={styles.stage}>Create, explore & collect digital art NFTs.</div>
            <h2 className={cn('h3', styles.title)}>The new creative economy</h2>
            <Link className={cn('button-stroke', styles.button)} to="/search01">
              Start your search
            </Link>
          </div>
          <div className={styles.wrapper}>
            <Slider className="creative-slider" {...settings}>
              {favorites.map((x: any) => (
                <div className={styles.slide} key={nextId()}>
                  <div className={styles.row}>
                    <Player className={styles.player} item={x} />
                    <div className={styles.details}>
                      <div className={cn('h1', styles.subtitle)}>{x.name}</div>
                      <div className={styles.line}>
                        <div className={styles.item}>
                          <div className={styles.avatar}>
                            <img src={x.media} alt="Avatar" />
                          </div>
                          <div className={styles.description}>
                            <Link to={`/profile/${x.creator.id}`}>
                              <div className={styles.category}>Creator</div>
                              <div className={styles.text}>
                                {x.creator.name.length > 16
                                  ? `${x.creator.name.slice(0, 13)}...${x.creator.name.slice(-3)}`
                                  : x.creator.name}
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className={styles.item}>
                          <div className={styles.icon}>
                            <Icon name="stop" size="24" />
                          </div>
                          <div className={styles.description}>
                            <div className={styles.category}>Instant price</div>
                            <div className={styles.text}>3.5 ETH</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.wrap}>
                        <div className={styles.info}>Current Bid</div>
                        <div className={styles.currency}>{x.currency.name}</div>
                        <div className={styles.price}>{x.price}</div>
                        {/* <div className={styles.info}>Auction ending in</div>
                        <div className={styles.timer}>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>Hrs</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>24</div>
                            <div className={styles.time}>mins</div>
                          </div>
                          <div className={styles.box}>
                            <div className={styles.number}>19</div>
                            <div className={styles.time}>secs</div>
                          </div>
                        </div> */}
                      </div>
                      <div className={styles.btns}>
                        <Button
                          color="outline"
                          className={cn('button', styles.button)}
                          onClick={() => setVisibleModalBid(true)}
                          icon="eye"
                          disabled
                        >
                          <Text tag="span">Place a bid 123</Text>
                        </Button>
                        <Link className={cn('button-stroke', styles.button)} to={`/item/${x.id}`}>
                          View item
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Modal visible={visibleModalBid} onClose={() => setVisibleModalBid(false)}>
        <Connect />
      </Modal>
    </>
  );
});

export default Hero;
