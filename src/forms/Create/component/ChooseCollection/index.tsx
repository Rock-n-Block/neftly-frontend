import React, {useCallback, useEffect, useState} from 'react';
import cn from 'classnames';
// import {connect} from 'formik';
import {observer} from 'mobx-react';
import {useMst} from 'store/store';
import {Swiper, SwiperSlide} from 'swiper/react';

import {userApi} from 'services/api';
import {CreateCollection} from '../../../index';
import {createCollection} from 'assets/img/ChooseCollection';

import styles from './ChooseCollection.module.scss';
import {Modal} from "../../../../components";

import 'swiper/swiper.scss';

interface IProps {
  isSingle: boolean;
  activeCollectionId: number;
  onChange: (value: number) => void;
  className?: string;
}

interface ICollection {
  avatar?: string;
  title: string;
  id: number;
}

// TODO: remove after added collections
const mockCollections: ICollection[] = [
  {
    id: 1,
    title: 'New collection'
  },
  {
    id: 2,
    title: 'New collection2'
  },
  {
    id: 3,
    title: 'New collection2'
  },
  {
    id: 4,
    title: 'New collection2'
  },
  {
    id: 5,
    title: 'New collection2'
  },
]

const ChooseCollection: React.FC<IProps> = observer(({isSingle, activeCollectionId, onChange, className}) => {
  const {user} = useMst();

  const [collections, setCollections] = useState([...mockCollections]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const prevRef = React.createRef<HTMLDivElement>();
  // const nextRef = React.createRef<HTMLDivElement>();

  const changeCollection = useCallback((id: number) => {
    if (activeCollectionId !== id) onChange(id);
  }, [activeCollectionId, onChange]);

  const getCollections = useCallback(() => {
    userApi
      .getSingleCollections(user.address)
      .then(({data}) => {
        const newCollections = data.collections.filter((coll: any) => {
          if (isSingle) {
            return coll.standart === 'ERC721';
          }
          return coll.standart === 'ERC1155';
        });
        setCollections(newCollections)
        changeCollection(newCollections[0].id);
      })
      .catch((err) => console.log(err, 'get single'));
  }, [changeCollection, isSingle, user.address]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (user.address) {
      getCollections();
    }
  }, [getCollections, user.address]);

  return (
    <div className={cn(styles.cards,className)}>
      <Swiper
        spaceBetween={8}
        slidesPerView='auto'
        wrapperTag="ul"
      >
        <SwiperSlide tag="li" key='collection_0'
                     className={cn(styles.card, !activeCollectionId && styles.active)}>
          <div
            onClick={handleOpenModal}
            onKeyDown={handleOpenModal}
            role="button"
            tabIndex={0}
          >
            <img src={createCollection} alt='create' className={styles.plus}/>
            <div className={styles.subtitle}>Create collection</div>
          </div>
        </SwiperSlide>
        {!!collections.length && collections.map((collection) => (
          <SwiperSlide tag="li" key={`collection_${collection.id}`}
                       className={cn(styles.card, {
                         [styles.active]: activeCollectionId === collection.id,
                       })}>
            <div
              onClick={() => changeCollection(collection.id)}
              onKeyDown={() => changeCollection(collection.id)}
              role="button"
              tabIndex={0}
              className={styles.cardContent}
            >
              {!!collection.avatar && (<img src={collection.avatar} alt='create' className={styles.avatar}/>)}
              <div className={styles.subtitle}>{collection.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <CreateCollection isSingle={isSingle}/>
      </Modal>
    </div>
  );
});

export default ChooseCollection;
