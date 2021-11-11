import { FC } from 'react';
import styles from './styles.module.scss';
import { Avatar, EllipsisText, Text } from 'components';
import { IconEth } from 'assets/img';

interface IProps {
  index?: number;
  avatar: string;
  id: number;
  name: string;
  price: string;
  isVerified?: boolean;
}

const UserCard: FC<IProps> = ({ index, avatar, id, name, price, isVerified = false }) => {
  return (
    <li className={styles.userCard}>
      <Text color="secondary" weight="bold" size="m">
        {index}
      </Text>
      <Avatar
        avatar={avatar}
        id={id}
        isVerified={isVerified}
        isCollection
        size={56}
        badgeSize={16}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <EllipsisText>
          <Text weight="bold" size="m">
            {name}
          </Text>
        </EllipsisText>
        <Text size="m" color="red" className={styles.price}>
          <IconEth />
          {price}
        </Text>
      </div>
    </li>
  );
};
export default UserCard;
