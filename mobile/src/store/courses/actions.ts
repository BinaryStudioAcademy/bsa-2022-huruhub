import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  NotificationMessage,
  NotificationType,
} from '~/common/enums/notification/notification';
import {
  AsyncThunkConfig,
  CourseCreateRequestDto,
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseSelectMentorRequestParamsDto,
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  CourseUpdateCategoryRequestArguments,
  GetMentorRequestParamsDto,
  InterviewsCreateRequestBodyDto,
  MenteesToMentorsResponseDto,
  UserDetailsResponseDto,
  UserWithPermissions,
} from '~/common/types/types';
import { app, interviewsActions } from '~/store/actions';

import { ActionType } from './common';

const getCourses = createAsyncThunk<
  CourseGetResponseDto[],
  CourseFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_COURSES, async ({ title, categoryKey }, { extra }) => {
  const { coursesApi } = extra;
  const courses = await coursesApi.getAll({
    filtering: { title, categoryKey },
  });

  return courses;
});

const getCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { id } = payload;
  const course = await coursesApi.getById({ id });

  return course;
});

const addCourse = createAsyncThunk<
  CourseGetResponseDto,
  CourseCreateRequestDto,
  AsyncThunkConfig
>(ActionType.ADD_COURSE, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { url } = payload;
  const course = await coursesApi.create(url);

  return course;
});

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  return mentors;
});

const updateVisibilityBecomeMentor = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.UPDATE_VISIBILITY_BECOME_MENTOR, async (_, { getState }) => {
  const {
    auth: { user },
    courses: { mentors, course },
  } = getState();
  const isMentorBecomingVisible =
    course?.courseCategoryId &&
    !mentors.some((mentor) => mentor.id === user?.id);

  return Boolean(isMentorBecomingVisible);
});

const setBecomeMentorInvisible = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_BECOME_MENTOR_INVISIBLE, async () => {
  return false;
});

const createMentor = createAsyncThunk<
  CoursesToMentorsResponseDto,
  CoursesToMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;

  return mentorsApi.create(payload);
});

const becomeMentor = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.BECOME_MENTOR,
  async (_, { dispatch, getState, extra }) => {
    const {
      courses: { course },
      auth: { user },
    } = getState();

    const { interviewsApi } = extra;

    if (!user || !course) {
      return;
    }

    const passedCategoryInterviews =
      await interviewsApi.getPassedInterviewCategoryIds(user.id);
    const isCategoryPassed = passedCategoryInterviews.includes(
      course.courseCategoryId,
    );

    if (isCategoryPassed) {
      const payload: CoursesToMentorsRequestDto = {
        userId: user.id,
        courseId: course.id,
      };
      await dispatch(createMentor(payload)).unwrap();
      dispatch(setBecomeMentorInvisible());
      dispatch(
        app.notify({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.MENTOR_ADD,
        }),
      );
    } else {
      const payload: InterviewsCreateRequestBodyDto = {
        intervieweeUserId: user.id,
        categoryId: course.courseCategoryId,
      };
      dispatch(interviewsActions.createInterview(payload));
    }
  },
);

const updateCategory = createAsyncThunk<
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);

  return updatedCourse;
});

const chooseMentor = createAsyncThunk<
  void,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    courses: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  await coursesApi.chooseMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  return;
});

const updateisMentorChoosingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_CHOOSING_ENABLED, (_, { getState }) => {
  const {
    auth: { user },
    courses: { mentors },
  } = getState();

  const isMentorCheck = mentors.some(
    (mentor) => mentor.id === (user as UserWithPermissions).id,
  );

  return !isMentorCheck;
});

const getMenteesMentor = createAsyncThunk<
  MenteesToMentorsResponseDto | null,
  GetMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTEES_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;
  const mentor = await mentorsApi.getMenteesMentor(payload);

  return mentor;
});

export {
  addCourse,
  becomeMentor,
  chooseMentor,
  createMentor,
  getCourse,
  getCourses,
  getMenteesMentor,
  getMentorsByCourseId,
  setBecomeMentorInvisible,
  updateCategory,
  updateisMentorChoosingEnabled,
  updateVisibilityBecomeMentor,
};
