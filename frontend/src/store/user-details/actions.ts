import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  UserDetailsResponseDto,
  UserDetailsUpdateAvatarRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';

import { ActionType } from './common';

const getUserDetails = createAsyncThunk<
  UserDetailsResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_USER_DETAILS, async (_, { extra }) => {
  const { userDetailsApi } = extra;
  const userDetails = await userDetailsApi.get();

  return userDetails;
});

const updateUserDetails = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
  AsyncThunkConfig
>(
  ActionType.UPDATE_USER_DETAILS,
  async (updateUserDetailsPayload, { extra }) => {
    const { userDetailsApi, notification } = extra;
    const userDetails = await userDetailsApi.updateUserDetails(
      updateUserDetailsPayload,
    );
    notification.success(NotificationMessage.PROFILE_DETAILS_UPDATE);

    return userDetails;
  },
);

const updateUserAvatar = createAsyncThunk<
  UserDetailsResponseDto,
  UserDetailsUpdateAvatarRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE_AVATAR, async ({ file, userId }, { extra }) => {
  const { userDetailsApi } = extra;

  const updatedUserDetails = await userDetailsApi.updateUserAvatar({
    file,
    userId,
  });

  return updatedUserDetails;
});

export { getUserDetails, updateUserAvatar, updateUserDetails };
