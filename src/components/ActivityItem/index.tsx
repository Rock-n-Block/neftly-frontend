import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  bidAction,
  burnAction,
  commentAction,
  followingAction,
  likeAction,
  listingAction,
  mintAction,
  saleAction,
  transferAction,
} from 'assets/img';
import { routes } from 'appConstants';
import { Avatar, Text } from 'components';
import { sliceString } from 'utils';

import s from './ActivityItem.module.scss';

interface Props {
  activityType: string;
  userImg: string;
  actionImg: string;
  userName: string;
  actionDescription: string;
  actionDescriptionName: string;
  timeAgo: string;
  linkId: string;
  userId: string;
}

const ActionsIcons: { [key: string]: string } = {
  like: likeAction,
  follow: followingAction,
  comment: commentAction,
  default: likeAction,
  bet: bidAction,
  buy: saleAction,
  listing: listingAction,
  transfer: transferAction,
  mint: mintAction,
  burn: burnAction,
};

const ActivityItem: React.FC<Props> = ({
  activityType,
  userImg,
  actionImg,
  userName,
  actionDescription,
  timeAgo,
  actionDescriptionName,
  linkId,
  userId,
}) => {
  const history = useHistory();

  const openNotification = (method: string, link_id: number | string) => {
    if (method === 'follow') {
      history.push(routes.profile.link(link_id));
    } else {
      history.push(routes.nft.link(link_id));
    }
  };

  return (
    <section className={s.item}>
      <div className={s.avatar}>
        <div className={s.actionType}>
          <img
            src={ActionsIcons[activityType.toLowerCase()] || ActionsIcons.default}
            alt="action"
          />
        </div>
        <Avatar id={userId} avatar={userImg} size="80" />
      </div>

      <div className={s.info}>
        <Text size="l" className={s.name} tag="p">
          {userName?.length > 15 ? sliceString(userName) : userName}
        </Text>
        <Text size="m" className={s.event} tag="p">
          {actionDescription}{' '}
          <Text tag="span" size="m" color="primary">
            {actionDescriptionName}
          </Text>
        </Text>
        <Text size="s" color="lightGray" className={s.time} tag="p">
          {timeAgo}
        </Text>
      </div>

      <div
        className={s.image}
        onClick={() => openNotification(actionDescription, linkId)}
        tabIndex={0}
        onKeyDown={() => {}}
        role="button"
      >
        <div className={s.image_wrapper}>
          <img src={actionImg} alt="actionImg" />
        </div>
      </div>
    </section>
  );
};

export default ActivityItem;
