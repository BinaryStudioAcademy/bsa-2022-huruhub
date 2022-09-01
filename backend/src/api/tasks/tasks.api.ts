import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import {
  HttpCode,
  HttpMethod,
  PaginationDefaultValue,
  TasksApiPath,
} from '~/common/enums/enums';
import {
  EntityPaginationRequestQueryDto,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdAndModuleId,
  TaskNoteManipulateRequestBodyDto,
} from '~/common/types/types';
import { task as taskService } from '~/services/services';
import {
  pagination as paginationValidationSchema,
  taskByMenteeIdAndModuleId as taskByMenteeIdAndModuleIdValidationSchema,
  tasksByIdParams as tasksByIdParamsValidationSchema,
  tasksManipulateRequestBody as tasksManipulateRequestBodyValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    task: typeof taskService;
  };
};

const initTasksApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { task: taskService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: TasksApiPath.TASKS_$ID,
    schema: {
      params: tasksByIdParamsValidationSchema,
      body: tasksManipulateRequestBodyValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Body: TaskNoteManipulateRequestBodyDto;
        Params: TaskByIdRequestParamsDto;
      }>,
      rep,
    ) {
      const { note, status } = req.body;
      const { taskId } = req.params;
      const { id: authorId } = req.user;

      const newNote = await taskService.manipulate({
        note,
        authorId,
        taskId,
        status,
      });

      rep.status(HttpCode.CREATED).send(newNote);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: TasksApiPath.MODULES_$ID_MENTEES_$ID,
    schema: { params: taskByMenteeIdAndModuleIdValidationSchema },
    async handler(
      req: FastifyRequest<{ Params: TaskGetByMenteeIdAndModuleId }>,
      rep,
    ) {
      const { menteeId, moduleId } = req.params;
      const task = await taskService.getByMenteeIdAndModuleId({
        menteeId,
        moduleId,
      });

      rep.status(task ? HttpCode.OK : HttpCode.NOT_FOUND).send(task);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: TasksApiPath.TASKS_$ID_NOTES,
    schema: {
      params: tasksByIdParamsValidationSchema,
      querystring: paginationValidationSchema,
    },
    async handler(
      req: FastifyRequest<{
        Params: TaskByIdRequestParamsDto;
        Querystring: EntityPaginationRequestQueryDto;
      }>,
      rep,
    ) {
      const { taskId } = req.params;
      const {
        count = PaginationDefaultValue.DEFAULT_COUNT,
        page = PaginationDefaultValue.DEFAULT_PAGE,
      } = req.query;
      const notes = await taskService.getAllNotes({ taskId, count, page });

      rep.status(HttpCode.OK).send(notes);
    },
  });
};

export { initTasksApi };
