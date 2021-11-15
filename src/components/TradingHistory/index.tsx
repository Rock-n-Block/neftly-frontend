import { FC } from 'react';
import cx from 'classnames';
import { Table, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  columns: any[];
  tableData: any[];
  className?: string;
};

const TradingHistory: FC<Props> = ({
  columns,
  tableData,
  className,
}) => (
  <div className={cx(styles.history, className)}>
    <div className={styles.chartFilter}>
      <Text size="l">Trading History</Text>
    </div>
    <Text size="l" className={styles.soldOut}>{tableData.length} items sold</Text>
    <div className={styles.tableWrapper}>
      <Table columns={columns} data={tableData} />
    </div>
  </div>
);

export default TradingHistory;
