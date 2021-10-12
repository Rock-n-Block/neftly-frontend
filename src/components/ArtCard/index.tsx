import { FC } from 'react';
import { pinkHeart } from 'assets/img';
import cx from 'classnames';
import { Tag, Text } from 'components';
import { numberFormatter } from 'utils';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { routes } from '../../appConstants';

type Props = {
  type?: 'Small' | 'Medium';
  artId: string | number;
  className?: string;
  imageMain: string;
  imageSecondaryOne?: string;
  imageSecondaryTwo?: string;
  imageSecondaryThree?: string;
  allArtNumber?: string | number;
  name: string;
  price: string | number;
  asset: string;
  inStockNumber?: number | string;
  author: string;
  authorAvatar: string;
  likesNumber: number | string;
  tags?: any[];
  isCollection?: boolean;
};

const ArtCard: FC<Props> = ({
  type = 'Small',
  artId,
  className,
  imageMain,
  imageSecondaryOne,
  imageSecondaryTwo,
  imageSecondaryThree,
  allArtNumber = '25',
  name,
  price,
  asset,
  inStockNumber,
  author,
  authorAvatar,
  likesNumber,
  tags,
  isCollection,
}) => (
  <div className={cx(styles.artCard, className)}>
    <Link
      to={isCollection ? `${routes.collection.link}/${artId}` : `${routes.nft.link}/${artId}`}
      className={styles[`mainImageWrapper${type}`]}
    >
      <div className={styles.tagContainer}>
        {tags?.map((tag) => (
          <Tag className={styles.tag} type={tag.type} auctionEndTime={tag.auctionEndTime} />
        ))}
      </div>
      <img className={styles.mainImage} src={imageMain} alt="" />
    </Link>
    {type === 'Medium' && (
      <div className={cx(styles.secondaryImagesContainer)}>
        <div className={styles.secondaryImageWrapper}>
          <img src={imageSecondaryOne} alt="" />
        </div>

        <div className={styles.secondaryImageWrapper}>
          {imageSecondaryTwo && <img src={imageSecondaryTwo} alt="" />}
        </div>
        <div className={cx(styles.secondaryImageWrapper, styles.lastSecondaryImageWrapper)}>
          {allArtNumber > 3 && (
            <Text className={styles.allArtNumber} size="m">{`${allArtNumber} +`}</Text>
          )}
          {imageSecondaryThree && <img src={imageSecondaryThree} alt="" />}
        </div>
      </div>
    )}
    <div className={styles.artCardInfo}>
      <Text size="xl">{name}</Text>
      <div className={styles.flexContainer}>
        {!isCollection && (
          <Text className={styles.artCardPrice} size="m">{`${price} ${asset}`}</Text>
        )}
        {type === 'Small' && <Text size="m">{`in stock: ${inStockNumber}`}</Text>}
      </div>
      <div className={cx(styles.flexContainer, styles.artCardAuthorContainer)}>
        <div className={styles.flexContainer}>
          <img src={authorAvatar} alt="" />
          <Text className={styles.artCardAuthor}>{author}</Text>
        </div>
        <div className={cx(styles.flexContainer, styles.artCardSmallLikes)}>
          <img className={styles.artCardHeart} src={pinkHeart} alt="" />
          <Text>{numberFormatter(+likesNumber, 3)}</Text>
        </div>
      </div>
    </div>
  </div>
);

export default ArtCard;
