import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationMessage, PermissionKey } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  CategoryGetAllResponseDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CourseSelectMentorRequestParamsDto,
  CoursesToMentorsRequestDto,
  CourseUpdateCategoryRequestArguments,
  GetMentorRequestParamsDto,
  InterviewsCreateRequestBodyDto,
  MenteesToMentorsResponseDto,
  UserDetailsResponseDto,
  UserWithPermissions,
} from 'common/types/types';
import { checkHasPermission } from 'helpers/helpers';
import { notification } from 'services/services';

import { ActionType } from './common';

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

const getModules = createAsyncThunk<
  CourseModulesGetAllResponseDto,
  CourseModulesGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MODULES, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const { courseId } = payload;

  const modules = await coursesApi.getCourseModulesById({ courseId });

  return modules;
});

const createInterview = createAsyncThunk<
  void,
  InterviewsCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_INTERVIEW, async (payload, { extra }) => {
  const { interviewsApi, notification } = extra;

  await interviewsApi.create(payload);

  notification.success(NotificationMessage.INTERVIEW_CREATE);
});

const getMentor = createAsyncThunk<
  MenteesToMentorsResponseDto | null,
  GetMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MENTOR, async (payload, { extra }) => {
  const { mentorsApi } = extra;

  const menteeToMentor = await mentorsApi.getMentor(payload);

  return menteeToMentor;
});

const createMentor = createAsyncThunk<
  void,
  CoursesToMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_MENTOR, async (payload, { extra }) => {
  const { mentorsApi, notification } = extra;

  await mentorsApi.create(payload);

  notification.success(NotificationMessage.MENTOR_ADD);
});

const getPassedInterviewsCategoryIdsByUserId = createAsyncThunk<
  number[],
  number,
  AsyncThunkConfig
>(ActionType.GET_PASSED_INTERVIEW_CATEGORY_IDS, async (payload, { extra }) => {
  const { interviewsApi } = extra;

  const passedInterviewsCategoryIds =
    await interviewsApi.getPassedInterviewsCategoryIdsByUserId(payload);

  return passedInterviewsCategoryIds;
});

const updateIsMentorBecomingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_BECOMING_ENABLED, async (_, { extra, getState }) => {
  const {
    course: { course },
  } = getState();

  const { coursesApi } = extra;

  const isMentor = await coursesApi.checkIsMentor({
    courseId: (course as CourseGetResponseDto).id,
  });

  const isMentorBecomingEnabled =
    (course as CourseGetResponseDto).courseCategoryId && !isMentor;

  return Boolean(isMentorBecomingEnabled);
});

const disableMentorBecoming = createAsyncThunk<boolean, void, AsyncThunkConfig>(
  ActionType.DISABLE_MENTOR_BECOMING,
  () => {
    return false;
  },
);

const getMentorsByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetMentorsRequestDto,
  AsyncThunkConfig
>(ActionType.GET_MENTORS, async (payload, { extra, getState }) => {
  const {
    course: { mentor },
  } = getState();
  const { coursesApi } = extra;
  const mentors = await coursesApi.getMentorsByCourseId(payload);

  if (mentor) {
    const availableMentors = mentors.filter((m: UserDetailsResponseDto) => {
      return m.id !== mentor.id;
    });

    return availableMentors;
  }

  return mentors;
});

const getMenteesByCourseId = createAsyncThunk<
  UserDetailsResponseDto[],
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(
  ActionType.GET_MENTOR_MENTEES,
  async (payload, { extra, dispatch, getState }) => {
    const { coursesApi } = extra;
    const {
      auth: { user },
    } = getState();
    const hasMentoringPermission = checkHasPermission({
      userPermissions: (user as UserWithPermissions).permissions,
      permissionKeys: [PermissionKey.MANAGE_MENTORING],
    });

    if (hasMentoringPermission) {
      await dispatch(checkIsMentor({ id: payload.id }));

      const {
        course: { isMentor },
      } = getState();

      if (!isMentor) {
        return [];
      }

      return coursesApi.getMenteesByCourseId(payload.id);
    }

    return [];
  },
);

const becomeAMentor = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.BECOME_A_MENTOR,
  (_, { dispatch, getState }) => {
    const {
      course: { passedInterviewsCategoryIds, course },
      auth: { user },
    } = getState();

    if (!user || !course) {
      return;
    }

    const isInterviewPassed = passedInterviewsCategoryIds.includes(
      course.courseCategoryId,
    );

    if (isInterviewPassed) {
      dispatch(createMentor({ courseId: course.id, userId: user.id }));

      return;
    }

    dispatch(
      createInterview({
        categoryId: course.courseCategoryId,
        intervieweeUserId: user.id,
      }),
    );
  },
);

const chooseMentor = createAsyncThunk<
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHOOSE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    course: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  const menteeToMentor = await coursesApi.chooseMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  notification.success(NotificationMessage.MENTOR_CHOOSE);

  return menteeToMentor;
});

const changeMentor = createAsyncThunk<
  MenteesToMentorsResponseDto,
  CourseSelectMentorRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHANGE_A_MENTOR, async ({ id }, { extra, getState }) => {
  const {
    course: { course },
    auth: { user },
  } = getState();
  const { coursesApi } = extra;

  const newMenteeToMentor = await coursesApi.changeMentor({
    courseId: (course as CourseGetResponseDto).id,
    menteeId: (user as UserWithPermissions).id,
    mentorId: id,
  });

  notification.success(NotificationMessage.MENTOR_CHANGE);

  return newMenteeToMentor;
});

const updateIsMentorChoosingEnabled = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.SET_IS_MENTOR_CHOOSING_ENABLED, (_, { getState }) => {
  const {
    auth: { user },
    course: { mentors, mentor },
  } = getState();
  const isMentor = mentors.some(
    (mentor) => mentor.id === (user as UserWithPermissions).id,
  );
  const hasMentor = Boolean(mentor);
  const canChooseMentor = !(isMentor || hasMentor);

  return canChooseMentor;
});

const checkIsMentor = createAsyncThunk<
  boolean,
  CourseGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.CHECK_IS_MENTOR, ({ id }, { extra }) => {
  const { coursesApi } = extra;

  return coursesApi.checkIsMentor({
    courseId: id,
  });
});

const getCategories = createAsyncThunk<
  CategoryGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_CATEGORIES, async (_, { extra }) => {
  const { categoriesApi } = extra;
  const categoriesDto = await categoriesApi.getAll();

  return categoriesDto;
});

const updateCategory = createAsyncThunk<
  CourseGetResponseDto,
  CourseUpdateCategoryRequestArguments,
  AsyncThunkConfig
>(ActionType.UPDATE_CATEGORY, async (payload, { extra }) => {
  const { coursesApi } = extra;
  const updatedCourse = await coursesApi.updateCategory(payload);
  notification.success(NotificationMessage.COURSE_CATEGORY_UPDATED);

  return updatedCourse;
});

export {
  becomeAMentor,
  changeMentor,
  checkIsMentor,
  chooseMentor,
  createInterview,
  createMentor,
  disableMentorBecoming,
  getCategories,
  getCourse,
  getMenteesByCourseId,
  getMentor,
  getMentorsByCourseId,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  updateCategory,
  updateIsMentorBecomingEnabled,
  updateIsMentorChoosingEnabled,
};
