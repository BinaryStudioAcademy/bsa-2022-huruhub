import * as Joi from 'joi';

import { ChatMessageGetAllRequestParamsDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageGetAllParams = Joi.object({
  [getNameOf<ChatMessageGetAllRequestParamsDto>('chatId')]:
    Joi.string().required(),
});

export { chatMessageGetAllParams };
