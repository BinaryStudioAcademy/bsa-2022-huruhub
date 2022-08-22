import React, { FC } from 'react';

import { PaginationDefaultValue } from '~/common/enums/enums';
import { PermissionsGetAllItemResponseDto } from '~/common/types/types';
import { Pagination, Table, View } from '~/components/common/common';
import {
  getPermissionsColumns,
  getPermissionsRows,
} from '~/components/uam-configure-group/helpers/helpers';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  permissions: PermissionsGetAllItemResponseDto[];
  onCheckboxToggle: (id: number) => void;
  pagination: {
    page: number;
    setPage: (page: number) => void;
  };
};

const PermissionsTable: FC<Props> = ({
  permissions,
  onCheckboxToggle,
  pagination,
}) => {
  const { control, reset } = useAppForm({ defaultValues: {} });

  const permissionRows = getPermissionsRows({
    permissions: permissions,
    onToggle: onCheckboxToggle,
    control,
  });
  const permissionColumns = getPermissionsColumns();

  useFocusEffect(
    useCallback(() => {
      reset({});
    }, []),
  );

  return (
    <View style={styles.container}>
      <Table
        columns={permissionColumns}
        data={permissionRows}
        columnWidthArr={[60, 200, 100]}
      />
      <Pagination
        totalCount={permissions.length}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        currentPage={pagination.page}
        onPageChange={pagination.setPage}
      />
    </View>
  );
};

export { PermissionsTable };