import { CategoryGetAllItemResponseDto } from 'common/types/types';

import { InterviewStatus } from '../enums/enums';

type InterviewsTableRow = {
  id: string;
  name: string;
  category: CategoryGetAllItemResponseDto;
  status: InterviewStatus;
  interviewer: string;
  date: string;
};

export { type InterviewsTableRow };
