import { MMKV } from 'react-native-mmkv';

import { ENV } from '~/common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { Courses } from './courses-api/courses-api.service';
import { GroupsApi } from './groups-api/groups-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { PermissionsApi } from './permissions-api/permissions-api.service';
import { Storage } from './storage/storage.service';
import { UsersApi } from './users-api/users-api.service';

const storage = new Storage({
  storage: new MMKV(),
});

const http = new Http({ storage });

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const groupsApi = new GroupsApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const usersApi = new UsersApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const notification = new Notification();

const permissionsApi = new PermissionsApi({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

const coursesApi = new Courses({
  apiPrefix: ENV.APP.API_PATH,
  http,
});

export {
  authApi,
  coursesApi,
  groupsApi,
  notification,
  permissionsApi,
  storage,
  usersApi,
};
