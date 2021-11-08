import styles from './styles.module.scss';
import { Text } from 'components';
import { Link } from 'react-router-dom';
import { routes } from 'appConstants';
import { FC } from 'react';
import { iconVerifiedMark } from 'assets/img';

interface IProps {
  id: string;
  avatar: string;
  name: string;
  verified?: boolean;
}

const ArtCardAuthor: FC<IProps> = ({ id, avatar, name, verified = false }) => {
  return (
    <div className={styles.artCardAuthor}>
      <Link to={routes.profile.link(id || '')} className={styles.avatar}>
        <img src={avatar} alt="" width={24} height={24} className={styles.avatarImg} />
        {verified ? (
          <img src={iconVerifiedMark} alt="verified" className={styles.verified} />
        ) : (
          <></>
        )}
      </Link>
      <Text className={styles.name} color="inherit">
        {name}
      </Text>
    </div>
  );
};
export default ArtCardAuthor;
