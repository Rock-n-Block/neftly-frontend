import React from 'react';
import { H2, Copyable, Text } from 'components';

import { sliceString } from 'utils';
import { profile_avatar_example, profile_page_bg_example } from 'assets/img';
import { zeroAddress } from 'appConstants';

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
        <Copyable
          valueToCopy={address || zeroAddress}
          classNameIcon={s.user_info__icon}
          withIcon
          title="Address"
        >
          <Text size="m">{sliceString(address || zeroAddress)}</Text>
        </Copyable>
      </div>
      <div className={s.user_info}>
        <div className={s.user_info__value}>{description}</div>
      </div>
    </section>
  );
};

export default CollectionMainInfo;
