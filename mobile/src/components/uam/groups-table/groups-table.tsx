import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { Pagination, Table, Text, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
} from '~/hooks/hooks';
import { uamActions } from '~/store/actions';

import { styles } from '../styles';
import { ActionCell } from './components/components';
import { getGroupsColumns } from './helpers/helpers';

const GroupsTable: FC = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.uam.groups);
  const { page, handlePageChange } = usePagination();

  const handleGroupsItemDelete = (groupId: number): void => {
    dispatch(uamActions.deleteGroup({ id: groupId }));
  };

  const groupsColumns = getGroupsColumns();
  const groupsRows = items.map((group) => ({
    ...group,
    action: <ActionCell id={group.id} onDelete={handleGroupsItemDelete} />,
  }));

  useEffect(() => {
    dispatch(
      uamActions.getGroups({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Groups</Text>
      <Table
        columnWidthArr={[50, 250, 250, 150]}
        columns={groupsColumns}
        data={groupsRows}
      />
      {total > 0 && (
        <Pagination
          totalCount={total}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
};

export { GroupsTable };
