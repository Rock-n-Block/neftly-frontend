import React from 'react';

import s from './ActivityItem.module.scss';

import likesIcon from 'assets/img/ActivityPage/action-likes.svg';
import foldersIcon from 'assets/img/ActivityPage/action-folder.svg';
import followIcon from 'assets/img/ActivityPage/action-follow.svg';
import commentIcon from 'assets/img/ActivityPage/action-comment.svg';
import { sliceString } from 'utils';

interface Props {
  activityType: string;
  userImg: string;
  actionImg: string;
  userName: string;
  actionDescription: string;
  timeAgo: string;
}

const ActionsIcons: { [key: string]: string } = {
  likes: likesIcon,
  followers: followIcon,
  comments: commentIcon,
  collections: foldersIcon,
  default: likesIcon,
};

const ActivityItem: React.FC<Props> = ({
  activityType,
  userImg,
  actionImg,
  userName,
  actionDescription,
  timeAgo,
}) => {
  return (
    <section className={s.item}>
      <div className={s.avatar}>
        <div className={s.actionType}>
          <img src={ActionsIcons[activityType] || ActionsIcons.default} alt="action" />
        </div>
        <img src={userImg} alt="userAva" />
      </div>
      <div className={s.info}>
        <div className={s.name}>
          {userName?.length > 15 ? sliceString(userName) : userName}
        </div>
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
