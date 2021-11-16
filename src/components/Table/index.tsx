/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { useTable } from 'react-table';
import { TableProps } from 'typings';

import styles from './styles.module.scss';

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
                return (
                  <td className={styles.cell} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
