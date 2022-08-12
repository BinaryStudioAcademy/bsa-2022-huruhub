import { PaginationDefaultValue } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { getUsersColumns, getUsersRows } from 'components/uam/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { uamActions } from 'store/actions';

import styles from './styles.module.scss';

const UsersTable: FC = () => {
  const { page, handlePageChange } = usePagination({ queryName: 'page' });
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(
      uamActions.getUsers({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  const columns: Column<UsersGetResponseDto>[] = getUsersColumns();
  const rows: UsersGetResponseDto[] = getUsersRows(users.items);

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.usersTableHeading}>Users</h1>
      <Table data={rows} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={users.total}
      />
    </div>
  );
};

export { UsersTable };
