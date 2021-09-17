import cn from 'classnames';
import styles from './Player.module.scss';
// import Icon from '../Icon';

// TODO: fix any
interface IPlayerProps {
  className?: string;
  item: any;
}

const Player: React.FC<IPlayerProps> = ({ className, item }) => {
  return (
    <div className={cn(styles.player, className)}>
      <div className={styles.preview}>
        {item?.format === 'image' && (
          <img src={item.media || '/images/content/card-pic-6.jpg'} alt="Card" />
        )}
        {item?.format === 'video' &&
          (item.animation ? (
            <video controls>
              <source src={item.animation} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
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
        {/* <img src={item.media} alt="Video preview" />
        <div className={styles.control}>
          <button type="button" className={cn(styles.button, styles.play)}>
            <Icon name="play" size="24" />
          </button>
          <div className={styles.line}>
            <div className={styles.progress} style={{ width: '20%' }} />
          </div>
          <div className={styles.time}>2:20</div>
          <button type="button" className={styles.button}>
            <Icon name="volume" size="24" />
          </button>
          <button type="button" className={styles.button}>
            <Icon name="full-screen" size="24" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Player;
