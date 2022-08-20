import { createAsyncThunk } from '@reduxjs/toolkit';

import { ExceptionMessage, HttpCode, StorageKey } from '~/common/enums/enums';
import {
  AsyncThunkConfig,
  UserSignInRequestDto,
  UserSignUpRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';

import { ActionType } from './common';

const signUp = createAsyncThunk<
  UserWithPermissions,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signUp(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserWithPermissions,
  UserSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const { token, user } = await authApi.signIn(payload);
  storage.set(StorageKey.ACCESS_TOKEN, token);

  return user;
});

const loadCurrentUser = createAsyncThunk<
  UserWithPermissions,
  void,
  AsyncThunkConfig
>(
  ActionType.LOAD_CURRENT_USER,
  async (_payload, { dispatch, rejectWithValue, extra }) => {
    try {
      const { authApi } = extra;
      const user = await authApi.getCurrentUser();

      return user;
    } catch (err) {
      const errorMessage = (err as Error).message;
      const isHttpError = err instanceof HttpError;

      if (isHttpError && err.status === HttpCode.UNAUTHORIZED) {
        dispatch(logout());
      }

      return rejectWithValue(errorMessage ?? ExceptionMessage.UNKNOWN_ERROR);
    }
  },
);

const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LOGOUT,
  (_payload, { extra }) => {
    const { storage } = extra;

    storage.delete(StorageKey.ACCESS_TOKEN);
  },
);

export { loadCurrentUser, logout, signIn, signUp };
