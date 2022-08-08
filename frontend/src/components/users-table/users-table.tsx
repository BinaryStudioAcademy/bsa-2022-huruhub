import { ReactElement } from 'react';
import { Column } from 'react-table';
import { Table } from '../common/common';
import styles from './styles.module.scss';

const UsersTable = (): ReactElement => {
  const mockedData = [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ];

  const mockedColumns = [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ];

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={mockedData} columns={mockedColumns as Column[]} />
    </div>
  );
};

export { UsersTable };
