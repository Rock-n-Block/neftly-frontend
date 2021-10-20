import React from 'react';
import { H2 } from 'components';

import { ReactComponent as LinkIcon } from 'assets/img/ProfilePage/link_icon.svg';
import profile_avatar_example from 'assets/img/ProfilePage/profile_avatar_example.png';
import profile_page_bg_example from 'assets/img/ProfilePage/profile_page_bg_example.png';

import s from './CollectionMainInfo.module.scss';
import { TNullable } from 'typings';

interface ICollectionMainInfo {
  cover?: string;
  avatar?: string;
  name?: string;
  address?: string;
  description: TNullable<string>;
}

const CollectionMainInfo: React.FC<ICollectionMainInfo> = ({
  cover,
  avatar,
  name,
  address,
  description,
}) => {
  return (
    <section
      className={s.user}
      style={{
        backgroundImage: `url(${cover || profile_page_bg_example})`,
      }}
    >
      <div className={s.user_avatar}>
        <img src={avatar || profile_avatar_example} alt="profile_avatar_example" />
      </div>
      <H2 className={s.user_name}>{name}</H2>
      <div className={s.user_info}>
        <LinkIcon className={s.user_info__icon} />
        <div className={s.user_info__value}>{address}</div>
      </div>
      <div className={s.user_info}>
        <div className={s.user_info__value}>{description}</div>
      </div>
    </section>
  );
};

export default CollectionMainInfo;
