import React, { useCallback, useEffect, useState } from 'react';
import { iconCreateCircle } from 'assets/img';
import cn from 'classnames';
import { Carousel, EllipsisText, Modal, Text } from 'components';
import { observer } from 'mobx-react';
import { userApi } from 'services/api';
import { useMst } from 'store';
import carouselBreakpointsConfig from './carouselBreakpointsConfig';

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

    const handleCollectionChange = useCallback(
      (collectionId: number) => {
        if (activeCollectionId !== collectionId) {
          onChange(collectionId);
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
          handleCollectionChange(newCollections[0].id);
        })
        .catch((err) => console.error(err, 'get single'));
    }, [handleCollectionChange, isSingle, user.address]);

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
        <Carousel hideArrows slidesToShow={3} responsive={carouselBreakpointsConfig}>
          <div
            onClick={handleOpenModal}
            onKeyDown={handleOpenModal}
            role="button"
            tabIndex={0}
            className={cn(styles.card, !activeCollectionId && styles.active)}
          >
            <img src={iconCreateCircle} alt="create" className={styles.plus} />
            <Text className={styles.subtitle} color="gray">
              Create collection
            </Text>
          </div>
          {!!collections.length &&
            collections.map((collection) => (
              <div
                onClick={() => handleCollectionChange(collection.id)}
                onKeyDown={() => handleCollectionChange(collection.id)}
                role="button"
                tabIndex={0}
                key={`collection_${collection.id}`}
                className={cn(styles.card, {
                  [styles.active]: activeCollectionId === collection.id,
                })}
                // className={styles.cardContent}
              >
                <div className={styles.cardImg}>
                  {!!collection.avatar && (
                    <img src={collection.avatar} alt="create" className={styles.avatar} />
                  )}
                </div>
                <div className={styles.cardSubtitle}>
                  <EllipsisText>
                    <Text tag="span">{collection.name}</Text>
                  </EllipsisText>
                </div>
              </div>
            ))}
        </Carousel>
        <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <CreateCollection isSingle={isSingle} onClose={() => setIsModalVisible(false)} />
        </Modal>
      </div>
    );
  },
);

export default ChooseCollection;
