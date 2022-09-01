import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  CourseGetResponseDto,
  CourseModulesGetAllItemResponseDto,
  UserDetailsResponseDto,
} from 'common/types/types';

import {
  checkIsMentor,
  chooseMentor,
  createMentor,
  disableMentorBecoming,
  getCategories,
  getCourse,
  getMenteesByCourseId,
  getMentorsByCourseId,
  getModules,
  getPassedInterviewsCategoryIdsByUserId,
  updateCategory,
  updateIsMentorBecomingEnabled,
  updateIsMentorChoosingEnabled,
} from './actions';

type State = {
  dataStatus: DataStatus;
  course: CourseGetResponseDto | null;
  modules: CourseModulesGetAllItemResponseDto[];
  passedInterviewsCategoryIds: number[];
  isMentorBecomingEnabled: boolean;
  isMentorChoosingEnabled: boolean;
  mentors: UserDetailsResponseDto[];
  categories: CategoryGetAllItemResponseDto[];
  menteesByCourseId: UserDetailsResponseDto[];
  menteesByCourseDataStatus: DataStatus;
  isMentor: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  course: null,
  modules: [],
  passedInterviewsCategoryIds: [],
  isMentorBecomingEnabled: false,
  isMentorChoosingEnabled: false,
  mentors: [],
  categories: [],
  menteesByCourseId: [],
  menteesByCourseDataStatus: DataStatus.IDLE,
  isMentor: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getCourse.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCourse.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = payload;
  });
  builder.addCase(getCourse.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getModules.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getModules.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.modules = payload.items;
  });
  builder.addCase(getModules.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(
    getPassedInterviewsCategoryIdsByUserId.fulfilled,
    (state, { payload }) => {
      state.passedInterviewsCategoryIds = payload;
    },
  );
  builder.addCase(getPassedInterviewsCategoryIdsByUserId.rejected, (state) => {
    state.passedInterviewsCategoryIds = [];
  });
  builder.addCase(
    updateIsMentorBecomingEnabled.fulfilled,
    (state, { payload }) => {
      state.isMentorBecomingEnabled = payload;
    },
  );
  builder.addCase(getMentorsByCourseId.fulfilled, (state, { payload }) => {
    state.mentors = payload;
  });
  builder.addCase(getMentorsByCourseId.rejected, (state) => {
    state.mentors = [];
  });

  builder.addCase(getCategories.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.categories = action.payload.items;
  });
  builder.addCase(getCategories.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(updateCategory.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateCategory.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.course = action.payload;
  });
  builder.addCase(updateCategory.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(createMentor.fulfilled, (state) => {
    state.isMentorBecomingEnabled = false;
  });

  builder.addCase(disableMentorBecoming.fulfilled, (state, { payload }) => {
    state.isMentorBecomingEnabled = payload;
  });

  builder.addCase(chooseMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(chooseMentor.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentorChoosingEnabled = false;
  });
  builder.addCase(
    updateIsMentorChoosingEnabled.fulfilled,
    (state, { payload }) => {
      state.isMentorChoosingEnabled = payload;
    },
  );
  builder.addCase(getMenteesByCourseId.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
    state.menteesByCourseDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMenteesByCourseId.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.menteesByCourseId = payload;
    state.menteesByCourseDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getMenteesByCourseId.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
    state.menteesByCourseDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(checkIsMentor.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsMentor.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isMentor = payload;
  });
  builder.addCase(checkIsMentor.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
