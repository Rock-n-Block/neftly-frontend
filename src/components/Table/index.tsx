/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { useTable } from 'react-table';
import { IHistoryItem, TableProps } from 'typings';
import styles from './styles.module.scss';
import { TradingHistoryBuyer, TradingHistoryEvent, TradingHistoryPrice } from './TradingHistoryCells';

const Table: FC<TableProps> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className={styles.th} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className={styles.row} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const cellData: IHistoryItem = cell.row.original as IHistoryItem;

                switch (cell.column.Header) {
                  case 'Buyer': {
                    return (
                      <td className={styles.cell} {...cell.getCellProps()}>
                        <TradingHistoryBuyer name={cellData.name} id={cellData.id} avatar={cellData.avatar} date={cellData.date} />
                      </td>
                    );
                  }
                  case 'Price': {
                    return (
                      <td className={styles.cell} {...cell.getCellProps()}>
                        <TradingHistoryPrice amount={cellData.price as string | number} asset={cellData.currency as string} />
                      </td>
                    )
                  }
                  default: {
                    return (
                      <td className={styles.cell} {...cell.getCellProps()}>
                        <TradingHistoryEvent type={cellData.method as any} />
                      </td>
                    )
                  }
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
