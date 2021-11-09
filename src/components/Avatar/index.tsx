import {routes} from "appConstants";
import styles from "./styles.module.scss";
import {iconVerifiedMark} from "assets/img";
import {Link} from "react-router-dom";
import {FC} from "react";

interface IProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  isVerified?: boolean;
  size?: number | string;
  badgeSize?:number|string;
}

const Avatar: FC<IProps> = ({avatar, id, isCollection = false, isVerified = false, size = 24, badgeSize = 10}) => {
  return (
    <Link to={isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '')}
          className={styles.avatar}>
      <img src={avatar} alt="" width={size} height={size} className={styles.avatarImg}/>
      {isVerified && <img src={iconVerifiedMark} width={badgeSize} height={badgeSize} alt="verified" className={styles.verified}/>}
    </Link>
  )
}
export default Avatar;
