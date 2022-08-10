import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UsersGetAllItemResponseDto } from 'common/types/types';

import { deleteUser, getUsers } from './actions';

type State = {
  dataStatus: DataStatus;
  isDeleted: DataStatus;
  users: UsersGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  isDeleted: DataStatus.IDLE,
  users: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getUsers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getUsers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.users = action.payload.items;
  });
  builder.addCase(getUsers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(deleteUser.pending, (state) => {
    state.isDeleted = DataStatus.PENDING;
  });
  builder.addCase(deleteUser.fulfilled, (state, action) => {
    state.isDeleted = DataStatus.FULFILLED;
    state.users = state.users.filter(
      (user) => user.id !== Number(action.payload),
    );
  });
  builder.addCase(deleteUser.rejected, (state) => {
    state.isDeleted = DataStatus.REJECTED;
  });
});

export { reducer };
