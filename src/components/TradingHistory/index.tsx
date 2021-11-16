import { FC } from 'react';
import cx from 'classnames';
import { Select, Table, Text } from 'components';
import { OptionType } from 'typings';

import styles from './styles.module.scss';

type Props = {
  filterOptions: OptionType[];
  selectedOption: OptionType;
  columns: any[];
  tableData: any[];
  className?: string;
  onChangeSort: (value: any) => void;
};

const TradingHistory: FC<Props> = ({
  filterOptions,
  columns,
  tableData,
  className,
  onChangeSort,
  selectedOption,
}) => (
  <div className={cx(styles.history, className)}>
    <div className={styles.chartFilter}>
      <Text size="l">Price History</Text>
      <div className={styles.chartSelect}>
        <Text color="lightGray">Sort by</Text>
        <Select
          value={selectedOption}
          className={styles.chartSelect}
          options={filterOptions}
          onChange={onChangeSort}
        />
      </div>
    </div>
    <Text size="l">10 items sold</Text>
    <div className={styles.tableWrapper}>
      <Table columns={columns} data={tableData} />
    </div>
  </div>
);

export default TradingHistory;
