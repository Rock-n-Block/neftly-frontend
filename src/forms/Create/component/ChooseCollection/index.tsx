import React, { useCallback, useEffect, useState } from 'react';
import { createCollection } from 'assets/img/ChooseCollection';
import cn from 'classnames';
import { Carousel, Modal, Text } from 'components';
// import {connect} from 'formik';
import { observer } from 'mobx-react';
import { userApi } from 'services/api';
import { useMst } from 'store';

import { CreateCollection } from '../../../index';

import styles from './ChooseCollection.module.scss';

interface IProps {
  isSingle: boolean;
  activeCollectionId: number;
  onChange: (value: number) => void;
  className?: string;
}

interface ICollection {
  avatar?: string;
  name: string;
  id: number;
}

const ChooseCollection: React.FC<IProps> = observer(
  ({ isSingle, activeCollectionId, onChange, className }) => {
    const { user } = useMst();

    const [collections, setCollections] = useState<ICollection[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeCollection = useCallback(
      (id: number) => {
        if (activeCollectionId !== id) {
          onChange(id);
        }
      },
      [activeCollectionId, onChange],
    );

    const getCollections = useCallback(() => {
      userApi
        .getSingleCollections(user.address)
        .then(({ data }) => {
          const newCollections = data.collections.filter((coll: any) => {
            if (isSingle) {
              return coll.standart === 'ERC721';
            }
            return coll.standart === 'ERC1155';
          });
          setCollections(newCollections);
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
      // getCollections forces api requests on each keystroke in form
      // TODO: rework this component
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.address]);

    return (
      <div className={cn(styles.cards, className)}>
        {/* TODO: убрать выезды за layout */}
        <Carousel
          hideArrows
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1281,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 840,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 680,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 510,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 481,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 375,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          <div
            onClick={handleOpenModal}
            onKeyDown={handleOpenModal}
            role="button"
            tabIndex={0}
            className={cn(styles.card, !activeCollectionId && styles.active)}
          >
            <img src={createCollection} alt="create" className={styles.plus} />
            <Text className={styles.subtitle}>Create collection</Text>
          </div>
          {!!collections.length &&
            collections.map((collection) => (
              <div
                onClick={() => changeCollection(collection.id)}
                onKeyDown={() => changeCollection(collection.id)}
                role="button"
                tabIndex={0}
                key={`collection_${collection.id}`}
                className={cn(styles.card, {
                  [styles.active]: activeCollectionId === collection.id,
                })}
                // className={styles.cardContent}
              >
                {!!collection.avatar && (
                  <img src={collection.avatar} alt="create" className={styles.avatar} />
                )}
                <Text className={styles.subtitle} align="center">
                  {collection.name}
                </Text>
              </div>
            ))}
        </Carousel>
        <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <CreateCollection isSingle={isSingle} />
        </Modal>
      </div>
    );
  },
);

export default ChooseCollection;
