import { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { Button, H2, TitleDropdown } from 'components';
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

  console.log(users)

  return (
    <div className={cx(styles.topUsers, className)}>
      <H2 className={styles.title} align="center">
        Top collections over
        <TitleDropdown value={period} setValue={setPeriod} options={dropDownOptions} trianglePosition='center'/>
      </H2>
      {users.length !== 0 ?
        <ol className={styles.usersWrapper}>
          {users.map((user, index) => (
            <>
              <UserCard
                key={`user-${user.name}`}
                avatar={user.avatar}
                isVerified={user.is_verified}
                id={user.id}
                index={index + 1}
                name={user.name}
                price={user.price}
                profitIncrease={1234.5}
              />
            </>
          ))}
        </ol>
        : null}
      <Button className={styles.srcToRanking}>Go to Rankings</Button>
    </div>
  );
};

export default TopUsers;
