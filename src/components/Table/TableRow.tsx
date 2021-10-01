/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import type { Cell } from 'react-table';
import cx from 'classnames';
import type { TableRowProps as Props } from 'typings';

import styles from './styles.module.scss';

const TableRow: FC<Props> = ({ row, className }) => (
  <>
    <tr className={cx(styles.row, className)} {...row.getRowProps()}>
      {row.cells.map((cell: Cell) => (
        <td
          {...cell.getCellProps({
            className: styles.cell,
          })}
          style={{
            width: cell.column.width,
          }}
        >
          {cell.render('Cell')}
        </td>
      ))}
    </tr>
  </>
);

export default TableRow;
