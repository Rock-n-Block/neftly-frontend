<<<<<<< HEAD
import { routes } from "appConstants";
import styles from "./styles.module.scss";
import { iconVerifiedMark } from "assets/img";
import { Link } from "react-router-dom";
import { FC } from "react";
import { ReactComponent as NullAvatar } from 'assets/img/ProfilePage/Profile.svg';
import cn from "classnames";
=======
import { routes } from 'appConstants';
import styles from './styles.module.scss';
import { iconVerifiedMark } from 'assets/img';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
>>>>>>> a3fb3d4b72c1cdec1703dcca6d9ebe6ba5df3298

interface IProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  isVerified?: boolean;
  size?: number | string;
  badgeSize?: number | string;
  className?: string;
}

const Avatar: FC<IProps> = ({
  avatar,
  id,
  isCollection = false,
  isVerified = false,
  size = 24,
  badgeSize = 10,
<<<<<<< HEAD
  className
}) => {
  return (
    <Link to={isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '')}
      className={cn(styles.avatar, className)}>
      {avatar ?
        <img src={avatar} alt="" width={size} height={size} className={styles.avatarImg} /> :
        <NullAvatar />
      }
      {isVerified &&
        <img src={iconVerifiedMark} width={badgeSize} height={badgeSize} alt="verified" className={styles.verified} />}
=======
  className,
}) => {
  return (
    <Link
      to={isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '')}
      className={cn(styles.avatar, className)}
    >
      <img src={avatar} alt="" width={size} height={size} className={styles.avatarImg} />
      {isVerified && (
        <img
          src={iconVerifiedMark}
          width={badgeSize}
          height={badgeSize}
          alt="verified"
          className={styles.verified}
        />
      )}
>>>>>>> a3fb3d4b72c1cdec1703dcca6d9ebe6ba5df3298
    </Link>
  );
};
export default Avatar;
