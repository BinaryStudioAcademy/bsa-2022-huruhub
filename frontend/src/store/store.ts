import { configureStore } from '@reduxjs/toolkit';

import { authApi, usersApi } from 'services/services';
import { rootReducer } from './root-reducer';

const extraArgument = {
	authApi,
	usersApi
};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			thunk: { extraArgument }
		});
	}
});

export { extraArgument, store };
