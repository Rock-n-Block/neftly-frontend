import cn from 'classnames';
import styles from './Preview.module.scss';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';

interface IPreviewProps {
  className?: string;
  mediaURL?: string;
  onClose: () => void;
  onClear: () => void;
  name?: string;
  price?: string;
}

const Preview: React.FC<IPreviewProps> = ({
  className,
  onClose,
  onClear,
  mediaURL,
  name,
  price,
}) => {
  const getImage = (url: string) => {
    let result;
    if (url.slice(0, url.indexOf('/')) === 'data:image') {
      result = (
        <img
          // srcSet="/images/content/card-pic-6.jpg"
          src={url}
          alt="Card"
        />
      );
    }
    if (url.slice(0, url.indexOf('/')) === 'data:video') {
      result = (
        <video controls>
          <source src={url} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          <track kind="captions" />
        </video>
      );
    }
    return result;
  };
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button type="button" className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            {mediaURL ? (
              getImage(mediaURL)
            ) : (
              <img
                // srcSet="/images/content/card-pic-6.jpg"
                src="/images/content/card-pic-6@2x.jpg"
                alt="Card"
              />
            )}
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>{name || 'Black Golden Tiger'}</div>
                <div className={styles.price}>
                  <div className={styles.innerPrice}>
                    <span className="text-gradient">{price || 2.45} ETH</span>
                  </div>
                </div>
              </div>
              <div className={styles.line}>
                <div className={styles.users}>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-3.jpg" alt="Avatar" />
                  </div>
                  <div className={styles.avatar}>
                    <img src="/images/content/avatar-4.jpg" alt="Avatar" />
                  </div>
                </div>
                <div className={styles.counter}>3 in stock</div>
              </div>
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                <Icon name="candlesticks-up" size="20" />
                Highest bid <span>0.001 ETH</span>
              </div>
              <div className={styles.bid}>
                New bid
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={onClear} className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default Preview;
