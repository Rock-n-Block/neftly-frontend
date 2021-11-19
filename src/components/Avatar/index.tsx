import { routes } from "appConstants";
import styles from "./styles.module.scss";
import { iconVerifiedMark, NullAvatarSrc } from "assets/img";
import { Link } from "react-router-dom";
import { FC } from "react";
import cn from "classnames";
import { FallbackImage } from "containers";


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
  className
}) => {
  return (
    <Link to={isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '', 'created')}
      className={cn(styles.avatar, className)}>
      <FallbackImage src={avatar} className={styles.avatarImg} errorSrc={NullAvatarSrc} width={size} height={size} />
      {isVerified &&
        <img src={iconVerifiedMark} width={badgeSize} height={badgeSize} alt="verified" className={styles.verified} />}
    </Link>
  );
};
export default Avatar;
