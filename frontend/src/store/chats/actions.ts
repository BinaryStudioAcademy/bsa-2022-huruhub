import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChatMessageCreateRequestBodyDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllRequestParamsDto,
  ChatMessageGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getLastMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_LAST_MESSAGES, async (_, { extra }) => {
  const { chatsApi } = extra;
  const lastMessages = await chatsApi.getAllChatsLastMessages();

  return lastMessages;
});

const getMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  ChatMessageGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MESSAGES, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { id } = payload;

  const messagesDto = await chatsApi.getAllChatMessages(id);

  return messagesDto;
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_MESSAGE, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { message, receiverId, chatId } = payload;
  const newMessage = await chatsApi.createChatMessage({
    message,
    receiverId,
    chatId,
  });

  return newMessage;
});

export { createMessage, getLastMessages, getMessages };