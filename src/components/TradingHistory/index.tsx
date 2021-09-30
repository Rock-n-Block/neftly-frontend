import { FC } from 'react';
import cx from 'classnames';
import { Select, Table, Text } from 'components';
import { OptionType } from 'typings';

import styles from './styles.module.scss';

type Props = {
  filterOptions: OptionType[];
  columns: any[];
  tableData: any[];
	className?: string;
};

const TradingHistory: FC<Props> = ({ filterOptions, columns, tableData, className }) => (
  <div className={cx(styles.history, className)}>
    <div className={styles.chartFilter}>
      <Text size="l">Price History</Text>
      <div className={styles.chartSelect}>
        <Text color="lightGray">Sort by</Text>
        <Select className={styles.chartSelect} options={filterOptions} />
      </div>
    </div>
    <Text size="l">10 items sold</Text>
    <div className={styles.tableWrapper}>
      <Table columns={columns} data={tableData} />
    </div>
  </div>
);

export default TradingHistory;
