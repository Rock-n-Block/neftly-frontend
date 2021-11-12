import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { H2, TitleDropdown } from 'components';
import { activityApi } from 'services';
import UserCard from './UserCard';

import styles from './styles.module.scss';
import { OptionType } from 'typings';

type Props = {
  className?: string;
};
const dropDownOptions: OptionType[] = [
  {
    label: 'last 1 day',
    value: 'day',
  },
  {
    label: 'last 7 days',
    value: 'week',
  },
  {
    label: 'last month',
    value: 'month',
  },
];
const TopUsers: FC<Props> = ({ className }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [period, setPeriod] = useState<OptionType>(dropDownOptions[0]);
  const fetchTopUsers = useCallback(() => {
    //TODO: add period.value
    activityApi
      .getTopUsers({ type: 'seller', sortPeriod: period.value })
      .then(({ data }: any) => setUsers(data));
  }, [period.value]);

  useEffect(() => {
    fetchTopUsers();
  }, [fetchTopUsers]);
  return (
    <div className={cx(styles.topUsers, className)}>
      <H2 className={styles.title} align="center">
        Top users over
        <TitleDropdown value={period} setValue={setPeriod} options={dropDownOptions} />
      </H2>
      <ol className={styles.usersWrapper}>
        {users.map((user, index) => (
          <UserCard
            key={`user-${user.name}`}
            avatar={user.avatar}
            isVerified={user.is_verified}
            id={user.id}
            index={index + 1}
            name={user.name}
            price={user.price}
          />
        ))}
      </ol>
    </div>
  );
};

export default TopUsers;