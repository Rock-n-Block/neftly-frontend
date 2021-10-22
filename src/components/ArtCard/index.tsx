import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PinkHeart } from 'assets/img/pinkHeart.svg';
import cx from 'classnames';
import nextId from 'react-id-generator';
import { Button, Tag, Text } from 'components';
import { numberFormatter, sliceString } from 'utils';

import { IBidder } from 'typings';

import { routes } from 'appConstants';

import styles from './styles.module.scss';
import { toast } from 'react-toastify';

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
  authorId?: string;
  likesNumber?: number;
  tags?: any[];
  isCollection?: boolean;
  bids?: any[];
  isLiked?: boolean;
  likeAction?: (id: string | number) => Promise<any>;
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
  authorId,
  authorAvatar,
  likesNumber = 0,
  tags,
  isCollection,
  bids,
  isLiked = false,
  likeAction,
}) => {
  const [isLike, setIsLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likesNumber || (isLiked ? 1 : 0));

  const handleLike = useCallback(() => {
    if (!likeAction) {
      return;
    }
    // setIsLikePending(true);
    if (isLike) {
      likeAction(artId)
        .then(() => {
          // setLikesCount((prevValue) => prevValue - 1);
          setLikesCount(isLiked ? likesNumber - 1 : likesNumber);
          setIsLike(!isLike);
          toast.success('Dislike submitted');
        })
        .catch((error: any) => {
          console.log('Dislike error', error);
          toast.success('Dislike error');
        });
    } else {
      likeAction(artId)
        .then(() => {
          setLikesCount(isLiked ? likesNumber : likesNumber + 1);
          setIsLike(!isLike);
          toast.success('Like submitted');
        })
        .catch((error: any) => {
          console.log('Like error', error);
          toast.success('Like error');
        });
    }
  }, [artId, isLike, isLiked, likeAction, likesNumber]);
  return (
    <div className={cx(styles.artCard, className, styles[`artCard${type}`])}>
      <Link
        to={isCollection ? routes.collection.link(artId) : routes.nft.link(artId)}
        className={cx(styles[`mainImageWrapper${type}`], styles.imageWrapper)}
      >
        <div className={styles.tagContainer}>
          {tags?.map((tag) => (
            <Tag
              className={styles.tag}
              key={nextId()}
              type={tag.type}
              auctionEndTime={tag.auctionEndTime}
            />
          ))}
        </div>
        <img className={styles.mainImage} src={imageMain} alt="" />
      </Link>
      {type === 'Medium' && (
        <div className={cx(styles.secondaryImagesContainer)}>
          <div className={cx(styles.secondaryImageWrapper, styles.imageWrapper)}>
            <img src={imageSecondaryOne} alt="" />
          </div>

          <div className={cx(styles.secondaryImageWrapper, styles.imageWrapper)}>
            {imageSecondaryTwo && <img src={imageSecondaryTwo} alt="" />}
          </div>
          <div
            className={cx(
              styles.secondaryImageWrapper,
              styles.lastSecondaryImageWrapper,
              styles.imageWrapper,
            )}
          >
            {allArtNumber > 3 && (
              <Text className={styles.allArtNumber} size="m">{`${allArtNumber} +`}</Text>
            )}
            {imageSecondaryThree && <img src={imageSecondaryThree} alt="" />}
          </div>
        </div>
      )}
      <div className={styles.artCardInfo}>
        <Text size="xl">{sliceString(name, 20, 0)}</Text>
        <div className={styles.flexContainer}>
          {!isCollection && price && !!inStockNumber && (
            <Text className={styles.artCardPrice} size="m">
              {`${price} ${asset}`}{' '}
              {bids?.length ? <span className={styles.bidText}>(Highest Bid)</span> : null}
            </Text>
          )}
          {type === 'Small' && !bids?.length && (
            <Text size="m">{inStockNumber ? `in stock: ${inStockNumber}` : 'Out of stock'}</Text>
          )}
        </div>
        <div className={cx(styles.flexContainer, styles.artCardAuthorContainer)}>
          <div className={styles.flexContainer}>
            {bids?.length ? (
              <>
                <div className={styles.bidder_avatars}>
                  {bids.map((bidder: IBidder, index: number) => {
                    return index < 2 ? (
                      <img
                        key={bidder.id}
                        className={styles.bidder_avatar}
                        src={bidder.bidder_avatar}
                        alt=""
                      />
                    ) : null;
                  })}
                </div>
                <Text className={styles.artCardAuthor}>{bids.length} people have bidded</Text>
              </>
            ) : (
              <>
                <Link to={routes.profile.link(authorId || '')}>
                  <img src={authorAvatar} className={styles.author_avatar} alt="" />
                </Link>
                <Text className={styles.artCardAuthor}>{author}</Text>
              </>
            )}
          </div>
          {likeAction && (
            <div className={cx(styles.flexContainer, styles.artCardSmallLikes)}>
              <Button
                className={cx(styles.artCardHeart, { [styles.artCardHeartActive]: isLike })}
                onClick={handleLike}
                color="transparent"
              >
                <PinkHeart />
              </Button>
              <Text>{numberFormatter(likesCount, 3)}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
