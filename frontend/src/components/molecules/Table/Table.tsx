import React from 'react';
import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DynamicTableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  pagination?: TableProps<T>['pagination'];
  rowKey?: string | ((record: T) => string);
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
}

function DynamicTable<T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = false,
  rowKey = 'key',
  bordered = true,
  size = 'middle',
}: DynamicTableProps<T>) {
  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      bordered={bordered}
      size={size}
    />
  );
}

export default DynamicTable;
