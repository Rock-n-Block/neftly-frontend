import cn from 'classnames';

import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';

import styles from './Preview.module.scss';

interface IPreviewProps {
  className?: string;
  mediaURL?: string;
  onClose: () => void;
  onClear?: () => void;
  name?: string;
  price?: string;
  format?: string;
}

const Preview: React.FC<IPreviewProps> = ({
  className,
  onClose,
  onClear,
  mediaURL,
  name,
  price,
}) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button type="button" className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              // srcSet="/images/content/card-pic-6.jpg"
              src={mediaURL || '/images/content/card-pic-6@2x.jpg'}
              alt="Card"
            />
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
