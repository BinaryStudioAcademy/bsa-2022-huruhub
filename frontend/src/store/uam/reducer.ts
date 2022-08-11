import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  EntityPagination,
  GroupsGetAllItemResponseDto,
  UsersGetResponseDto,
} from 'common/types/types';

import { getGroups, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  users: EntityPagination<UsersGetResponseDto>;
  groups: GroupsGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  users: {
    items: [],
    total: 0,
  },
  groups: [],
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
});

export { reducer };
