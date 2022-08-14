import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  EntityPagination,
  GroupsItemResponseDto,
  PermissionGetAllItemResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { deleteUser, getGroups, getPermissions, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: EntityPagination<UsersGetResponseDto>;
  groups: GroupsItemResponseDto[];
  userDeleteDataStatus: DataStatus;
  permissions: PermissionGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: {
    items: [],
    total: 0,
  },
  userDeleteDataStatus: DataStatus.IDLE,
  groups: [],
  permissions: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getGroups.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
  });
  builder.addCase(getGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.userDeleteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    state.users = {
      items: state.users.items.filter((item) => item.id !== payload),
      total: --state.users.total,
    };
    state.userDeleteDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.userDeleteDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getPermissions.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getPermissions.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.permissions = payload.items;
  });
  builder.addCase(getPermissions.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
