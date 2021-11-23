import { Cell as ReactTableCell, Row as ReactTableRow, TableOptions } from 'react-table';
import { ICurrency } from 'typings';

export type TableCell<T extends Record<string, unknown> = {}> = ReactTableCell<T>;
export type TableRow<T extends Record<string, unknown> = {}> = ReactTableRow<T>;

export interface TableProps<T extends Record<string, unknown> = {}> extends TableOptions<T> {
  name?: string;
  pageSize?: number;
  withPagination?: boolean;
  className?: string;
  classNameTh?: string;
  classNameRow?: string;
  isLoading?: boolean;
  forcePage?: number;
  count?: number;
  onPageChange?: (value: number) => void;
  initialSortBy?: TableSortBy;
  onSortBy?: (value: TableSortBy) => void;
  currency: ICurrency;
}

export interface TableRowProps<T extends Record<string, unknown> = {}> {
  row: ReactTableRow<T>;
  className?: string;
}

export type TableSortBy = Array<{ id: string; desc: boolean }>;
