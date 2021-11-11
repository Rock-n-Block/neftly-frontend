import styles from './styles.module.scss';
import { Text,Avatar } from 'components';
import { FC } from 'react';

interface IProps {
  id: number|string;
  avatar: string;
  name: string;
  verified?: boolean;
}

const ArtCardAuthor: FC<IProps> = ({ id, avatar, name, verified = false }) => {
  return (
    <div className={styles.artCardAuthor}>
      <Avatar avatar={avatar} id={id} isVerified={verified} size={24} badgeSize={12}/>
      <Text className={styles.name} color="inherit">
        {name}
      </Text>
    </div>
  );
};
export default ArtCardAuthor;
