import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  EntityPagination,
  InterviewNoteCreateDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  InterviewsCheckUserIsInterviewerOrIntervieweePayload,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsGetInterviewersByCategoryRequestDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
  InterviewsUpdateRequestParamsDto,
  InterviewUpdateRequestArgumentsDto,
} from 'common/types/types';

import { ActionType } from './common';

const getInterview = createAsyncThunk<
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEW, async (request, { extra }) => {
  const { interviewsApi } = extra;
  const interview = await interviewsApi.getById(request.id);

  return interview;
});

const getInterviewersByCategory = createAsyncThunk<
  InterviewsGetInterviewerResponseDto[],
  InterviewsGetInterviewersByCategoryRequestDto,
  AsyncThunkConfig
>(ActionType.GET_INTERVIEWERS, async (request, { extra }) => {
  const { interviewsApi } = extra;
  const interview = await interviewsApi.getInterviewersByCategory(
    request.categoryId,
  );

  return interview;
});

const updateInterview = createAsyncThunk<
  InterviewsGetAllItemResponseDto,
  InterviewUpdateRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.UPDATE_INTERVIEW, async (updateInterviewPayload, { extra }) => {
  const { interviewsApi, notification } = extra;
  const interview = await interviewsApi.update(updateInterviewPayload);
  notification.success(NotificationMessage.INTERVIEW_UPDATE);

  return interview;
});

const getNotes = createAsyncThunk<
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  AsyncThunkConfig
>(ActionType.GET_NOTES, async (payload, { extra }) => {
  const { interviewsApi } = extra;
  const { interviewId } = payload;

  const notesPayload = await interviewsApi.getAllNotes({ interviewId });

  return notesPayload;
});

const createNote = createAsyncThunk<
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteCreateDto,
  AsyncThunkConfig
>(ActionType.CREATE_NOTE, async (payload, { extra }) => {
  const { interviewsApi } = extra;
  const { interviewId, note } = payload;

  const newNote = await interviewsApi.createNote({ interviewId, note });

  return newNote;
});

const getOtherByInterviewId = createAsyncThunk<
  EntityPagination<InterviewsGetOtherItemResponseDto>,
  InterviewsGetOtherRequestDto,
  AsyncThunkConfig
>(
  ActionType.GET_OTHER_INTERVIEWS,
  async ({ interviewId, count, page }, { extra }) => {
    const { interviewsApi } = extra;
    const otherInterviews = await interviewsApi.getOtherByInterviewId({
      interviewId,
      count,
      page,
    });

    return otherInterviews;
  },
);

const checkUserIsInterviewerOrInterviewee = createAsyncThunk<
  void,
  InterviewsCheckUserIsInterviewerOrIntervieweePayload,
  AsyncThunkConfig
>(
  ActionType.CHECK_USER_IS_INTERVIEWER_OR_INTERVIEWEE,
  ({ interviewer, interviewee, userId }, { extra }) => {
    const { navigation, notification } = extra;

    if (!(interviewer === userId || interviewee === userId)) {
      notification.error(NotificationMessage.PERMISSION_DENIED);
      navigation.push(AppRoute.SIGN_IN);
    }
  },
);

export {
  checkUserIsInterviewerOrInterviewee,
  createNote,
  getInterview,
  getInterviewersByCategory,
  getNotes,
  getOtherByInterviewId,
  updateInterview,
};
