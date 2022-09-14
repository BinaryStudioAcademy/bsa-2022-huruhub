import { GroupsItemResponseDto } from 'common/types/types';
import { GroupsTableAccessor } from 'components/uam/common/enums/enums';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { Column } from 'react-table';

import { ActionsCell, DateCell } from '../components/components';

const getGroupsColumns = (
  onGroupDelete: (groupId: number) => void,
): Column<GroupsItemResponseDto>[] => {
  return [
    {
      Header: 'ID',
      accessor: GroupsTableAccessor.ID,
      width: 50,
    },
    {
      Header: 'Name',
      accessor: GroupsTableAccessor.NAME,
      minWidth: 80,
    },
    {
      Header: 'Key',
      accessor: GroupsTableAccessor.KEY,
      minWidth: 60,
    },
    {
      Header: 'Created',
      accessor: GroupsTableAccessor.CREATED_AT,
      Cell: DateCell,
      minWidth: 100,
    },
    {
      Header: 'Actions',
      accessor: ({ id }: GroupsItemResponseDto): GroupsTableActionsProps => ({
        onDelete: onGroupDelete,
        id,
      }),
      Cell: ActionsCell,
      width: 120,
      minWidth: 120,
    },
  ];
};

export { getGroupsColumns };
