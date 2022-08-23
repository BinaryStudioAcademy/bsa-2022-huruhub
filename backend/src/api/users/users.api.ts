import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  UsersApiPath,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  UsersDeleteRequestParamsDto,
} from '~/common/types/types';
import { user as userService } from '~/services/services';
import {
  pagination as paginationQueryValidationSchema,
  userDelete as userDeleteRequestParamsValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    user: typeof userService;
  };
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: UsersApiPath.ROOT,
    schema: {
      querystring: paginationQueryValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Querystring: EntityPaginationRequestQueryDto;
      }>,
      rep,
    ) {
      const {
        page = PaginationDefaultValue.DEFAULT_PAGE,
        count = PaginationDefaultValue.DEFAULT_COUNT,
      } = req.query;

      const users = await userService.getAll({
        page,
        count,
      });

      return rep.status(HttpCode.OK).send(users);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: UsersApiPath.$ID,
    schema: { params: userDeleteRequestParamsValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: UsersDeleteRequestParamsDto }>,
      rep,
    ) {
      const { id } = req.params;

      const isDeleted = await userService.delete(req.user.id, Number(id));
      const status =
        isDeleted === undefined
          ? HttpCode.BAD_REQUEST
          : isDeleted
          ? HttpCode.OK
          : HttpCode.NOT_FOUND;

      return rep.status(status).send(isDeleted);
    },
  });
};

export { initUsersApi };
