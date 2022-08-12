import { configureStore } from '@reduxjs/toolkit';

import { authApi, notification, storage } from '~/services/services';

import { handleError } from './middlewares/middlewares';
import { rootReducer } from './root-reducer';

const extraArgument = {
  authApi,
  notification,
  storage,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(handleError);
  },
});

export { extraArgument, store };
