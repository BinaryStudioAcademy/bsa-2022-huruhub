import * as Joi from 'joi';

import { CourseFilteringDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const courseFiltering = Joi.object({
  [getNameOf<CourseFilteringDto>('title')]: Joi.string().allow(null, ''),
  [getNameOf<CourseFilteringDto>('categoryKey')]: Joi.string().allow(null, ''),
});

export { courseFiltering };