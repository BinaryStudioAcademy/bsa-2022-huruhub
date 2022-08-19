import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  InterviewsApiPath,
  PermissionKey,
} from '~/common/enums/enums';
import { checkHasPermissions } from '~/hooks/hooks';
import { interview as interviewService } from '~/services/services';

type Options = {
  services: {
    interview: typeof interviewService;
  };
};

const initInterviewsApi: FastifyPluginAsync<Options> = async (
  fastify,
  opts,
) => {
  const { interview: interviewService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.ROOT,
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEWS),
    async handler(req, res) {
      const interviews = await interviewService.getAll();

      return res.status(HttpCode.OK).send(interviews);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: InterviewsApiPath.$ID,
    preHandler: checkHasPermissions(PermissionKey.MANAGE_INTERVIEWS),
    async handler(req: FastifyRequest<{ Params: { id: number } }>, res) {
      const { id } = req.params;
      const interview = await interviewService.getById(id);

      return res.status(HttpCode.OK).send(interview);
    },
  });
};

export { initInterviewsApi };