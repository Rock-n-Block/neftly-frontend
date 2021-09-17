import React, { useState } from 'react';
import nextId from 'react-id-generator';
import { Link } from 'react-router-dom';
import Slider from 'react-slick/lib/index';
import cn from 'classnames';

import Dropdown from '../../../components/Dropdown';
import DropdownEmpty from '../../../components/DropdownEmpty';
import Icon from '../../../components/Icon';

import Add from './Add';

import styles from './Popular.module.scss';

const items = [
  {
    name: 'Edd Harris',
    sign: '/images/content/cup.svg',
    number: '1',
    url: '/profile',
    color: '#3772FF',
    avatar: '/images/content/avatar-5.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Odell Hane',
    sign: '/images/content/donut.svg',
    number: '2',
    url: '/profile',
    color: '#9757D7',
    avatar: '/images/content/avatar-6.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Marlee Kuphal',
    sign: '/images/content/lightning.svg',
    number: '3',
    url: '/profile',
    color: '#45B26B',
    avatar: '/images/content/avatar-7.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Payton Kunde',
    sign: '/images/content/donut.svg',
    number: '4',
    url: '/profile',
    color: '#23262F',
    avatar: '/images/content/avatar-8.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Payton Buckridge',
    sign: '/images/content/donut.svg',
    number: '5',
    url: '/profile',
    color: '#777E90',
    avatar: '/images/content/avatar-9.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Edd Harris',
    sign: '/images/content/cup.svg',
    number: '1',
    url: '/profile',
    color: '#3772FF',
    avatar: '/images/content/avatar-5.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Odell Hane',
    sign: '/images/content/donut.svg',
    number: '2',
    url: '/profile',
    color: '#9757D7',
    avatar: '/images/content/avatar-6.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
  {
    name: 'Marlee Kuphal',
    sign: '/images/content/lightning.svg',
    number: '3',
    url: '/profile',
    color: '#45B26B',
    avatar: '/images/content/avatar-7.jpg',
    reward: '/images/content/reward-1.svg',
    price: '<span>2.456</span> ETH',
  },
];

// TODO: убрать any
const SlickArrow: React.FC<any> = ({ children, ...props }) => (
  <button type="button" {...props}>
    {children}
  </button>
);

const dateOptions = ['Today', 'Morning', 'Dinner', 'Evening'];
const directionOptions = ['Sellers', 'Buyers'];

const Popular: React.FC = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
    responsive: [
      {
        breakpoint: 1340,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  const [date, setDate] = useState(dateOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);

  return (
    <div className={cn('section-bg', styles.section)}>
      <div className={cn('container', styles.container)}>
        <div className={styles.top}>
          <div className={styles.box}>
            <div className={styles.stage}>Popular</div>
            <DropdownEmpty
              className={styles.dropdown}
              value={direction}
              setValue={setDirection}
              options={directionOptions}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.label}>timeframe</div>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <Slider className="popular-slider" {...settings}>
            {items.map((x) => (
              <div className={styles.slide} key={nextId()}>
                <div className={styles.item}>
                  <div className={styles.head}>
                    <div className={styles.rating} style={{ backgroundColor: x.color }}>
                      <div className={styles.icon}>
                        <img src={x.sign} alt="Rating" />
                      </div>
                      <div className={styles.number}>#{x.number}</div>
                    </div>
                    <div className={styles.control}>
                      <Add className={styles.button} />
                      <Link className={styles.button} to={x.url}>
                        <Icon name="arrow-expand" size="24" />
                      </Link>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.avatar}>
                      <img src={x.avatar} alt="Avatar" />
                      <div className={styles.reward}>
                        <img src={x.reward} alt="Reward" />
                      </div>
                    </div>
                    <div className={styles.name}>{x.name}</div>
                    <div className={styles.price} dangerouslySetInnerHTML={{ __html: x.price }} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Popular;
