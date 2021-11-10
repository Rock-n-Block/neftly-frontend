import {FC, useCallback, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {Text, ArtCardAuthor, EllipsisText} from 'components';
import {storeApi} from "services";
import {INft} from "typings";

const RandomCard: FC = () => {
  const [token, setToken] = useState<INft | null>(null);
  const getRandomToken = useCallback(() => {
    storeApi.getRandomToken().then(({data}) => {
      setToken(data);
    })
  }, [])
  useEffect(() => {
    getRandomToken();
  }, [getRandomToken])
  if (!token) {
    return <></>
  }
  return (
    <div className={styles.randomCard}>
      <img className={styles.art} src={token.media} alt={token.name}/>
      <div className={styles.info}>
        <EllipsisText className={styles.name}>
          <Text size="xl">{token.name}</Text>
        </EllipsisText>
        <ArtCardAuthor
          name={token.creator.name}
          avatar={token.creator.avatar}
          id={token.creator.id}
          verified={token.creator.is_verificated}
        />
      </div>
    </div>
  );
};

export default RandomCard;
