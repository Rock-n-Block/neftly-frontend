import { FC } from 'react';
import styles from './styles.module.scss';
import { Text, ArtCardAuthor, EllipsisText } from 'components';
import mockData from './mockData';

const RandomCard: FC = () => {
  const { author } = mockData;
  return (
    <div className={styles.randomCard}>
      <img className={styles.art} src={mockData.img} alt={mockData.name} />
      <div className={styles.info}>
        <EllipsisText className={styles.name}>
          <Text size="xl">{mockData.name}</Text>
        </EllipsisText>
        <ArtCardAuthor
          name={author.name}
          avatar={author.avatar}
          id={author.id}
          verified={author.is_verified}
        />
      </div>
    </div>
  );
};

export default RandomCard;
