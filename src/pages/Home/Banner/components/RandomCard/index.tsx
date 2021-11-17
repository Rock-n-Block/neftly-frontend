import {FC, useCallback, useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {Link} from 'react-router-dom';
import {Text, ArtCardAuthor, EllipsisText} from 'components';
import {storeApi} from "services";
import {INft} from "typings";
import {routes} from "appConstants";

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
      <Link to={routes.nft.link(token.id)}>
        <div className={styles.artWrapper}>
          <img className={styles.art} src={token.media} alt={token.name} width={512} height={492}/>
        </div>
      </Link>

      <div className={styles.info}>
        <EllipsisText className={styles.name}>
          <Text size="xl">{token.name}</Text>
        </EllipsisText>
        <ArtCardAuthor
          name={token.creator.name}
          avatar={token.creator.avatar}
          id={token.creator.id}
          verified={token.creator.is_verificated}
          authorTextColor="lightGray"
        />
      </div>
    </div>
  );
};

export default RandomCard;
