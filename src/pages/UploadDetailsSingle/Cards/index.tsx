import nextId from 'react-id-generator';
import cn from 'classnames';

import Icon from '../../../components/Icon';

import styles from './Cards.module.scss';

interface ICardsProps {
  className?: string;
  items: Array<{
    title: string;
    color: string;
  }>;
  createCollection?: () => void;
  setCollection: (value: any) => void;
  activeCollection: string;
}

const Cards: React.FC<ICardsProps> = ({
  className,
  items,
  createCollection,
  setCollection,
  activeCollection,
}) => {
  return (
    <div className={cn(className, styles.cards)}>
      {items?.length
        ? items.map((x: any) => (
            <div
              className={cn(styles.card, { [styles.active]: activeCollection === x.id })}
              key={nextId()}
              tabIndex={0}
              onKeyDown={() => {}}
              role="button"
              onClick={
                x.title === 'Create collection' ? createCollection : () => setCollection(x.id)
              }
            >
              {x.title === 'Create collection' ? (
                <>
                  <div className={styles.plus} style={{ background: x.color }}>
                    <Icon name="plus" size="24" />
                  </div>
                  <div className={styles.subtitle}>{x.title}</div>
                </>
              ) : (
                <>
                  <div
                    className={styles.plus}
                    style={{
                      backgroundImage: `url(${x.avatar})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <Icon name="plus" size="24" />
                  </div>
                  <div className={styles.subtitle}>{x.name}</div>
                </>
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default Cards;
