import { configureStore } from '@reduxjs/toolkit';
import {
  authApi,
  categoriesApi,
  coursesApi,
  groupsApi,
  notification,
  permissionsApi,
  storage,
  usersApi,
} from 'services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  coursesApi,
  usersApi,
  groupsApi,
  storage,
  notification,
  permissionsApi,
  categoriesApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    }).concat(handleError);
  },
});

export { extraArgument, store };
