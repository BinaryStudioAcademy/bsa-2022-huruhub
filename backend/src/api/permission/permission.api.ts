import { FastifyPluginAsync } from 'fastify';

import { HttpCode, HttpMethod, PermissionApiPath } from '~/common/enums/enums';
import { permission as permissionService } from '~/services/services';

type Options = {
  services: {
    permission: typeof permissionService;
  };
};

const initPermissionApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { permission: permissionService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: PermissionApiPath.ROOT,
    async handler(req, rep) {
      const permissions = await permissionService.getPermissions();
      return rep.status(HttpCode.OK).send(permissions);
    },
  });
};

export { initPermissionApi };
