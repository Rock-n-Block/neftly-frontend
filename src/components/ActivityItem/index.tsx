import React from 'react';
import { tradingOffer, tradingPurchase } from 'assets/img';
import commentIcon from 'assets/img/ActivityPage/action-comment.svg';
import foldersIcon from 'assets/img/ActivityPage/action-folder.svg';
import followIcon from 'assets/img/ActivityPage/action-follow.svg';
import likesIcon from 'assets/img/ActivityPage/action-likes.svg';
import { sliceString } from 'utils';

import s from './ActivityItem.module.scss';

interface Props {
  activityType: string;
  userImg: string;
  actionImg: string;
  userName: string;
  actionDescription: string;
  timeAgo: string;
}

const ActionsIcons: { [key: string]: string } = {
  like: likesIcon,
  follow: followIcon,
  comment: commentIcon,
  default: likesIcon,
  bet: tradingOffer,
  buy: tradingPurchase,
  listing: foldersIcon,
};

const ActivityItem: React.FC<Props> = ({
  activityType,
  userImg,
  actionImg,
  userName,
  actionDescription,
  timeAgo,
}) => {
  console.log(activityType);
  return (
    <section className={s.item}>
      <div className={s.avatar}>
        <div className={s.actionType}>
          <img
            src={ActionsIcons[activityType.toLowerCase()] || ActionsIcons.default}
            alt="action"
          />
        </div>
        <img src={userImg} alt="userAva" />
      </div>
      <div className={s.info}>
        <div className={s.name}>{userName?.length > 15 ? sliceString(userName) : userName}</div>
        <div className={s.event}>{actionDescription}</div>
        <div className={s.time}>{timeAgo}</div>
      </div>
      <div className={s.image}>
        <div className={s.image_wrapper}>
          <img src={actionImg} alt="actionImg" />
        </div>
      </div>
    </section>
  );
};

export default ActivityItem;
