import { FastifyPluginAsync } from 'fastify';

import { WHITE_ROUTES } from '~/common/constants/constants';
import { ApiPath } from '~/common/enums/enums';
import { ValidationSchema } from '~/common/types/types';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import {
  auth,
  course,
  courseCategory,
  courseModule,
  group,
  permission,
  token,
  user,
} from '~/services/services';

import { initAuthApi } from './auth/auth.api';
import { initCategoriesApi } from './categories/categories.api';
import { initCourseModulesApi } from './course-modules/course-modules.api';
import { initCoursesApi } from './courses/courses.api';
import { initGroupsApi } from './groups/groups.api';
import { initPermissionsApi } from './permissions/permissions.api';
import { initUsersApi } from './users/users.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(authorizationPlugin, {
    services: {
      user,
      token,
    },
    routesWhiteList: WHITE_ROUTES,
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initPermissionsApi, {
    services: {
      permission,
    },
    prefix: ApiPath.PERMISSIONS,
  });

  fastify.register(initGroupsApi, {
    services: {
      group,
    },
    prefix: ApiPath.GROUPS,
  });

  fastify.register(initUsersApi, {
    services: {
      user,
    },
    prefix: ApiPath.USERS,
  });
  fastify.register(initCoursesApi, {
    services: {
      course,
    },
    prefix: ApiPath.COURSES,
  });
  fastify.register(initCategoriesApi, {
    services: {
      courseCategory,
    },
    prefix: ApiPath.CATEGORIES,
  });
  fastify.register(initCourseModulesApi, {
    services: {
      courseModule,
    },
    prefix: ApiPath.COURSES_MODULES,
  });
};

export { initApi };
