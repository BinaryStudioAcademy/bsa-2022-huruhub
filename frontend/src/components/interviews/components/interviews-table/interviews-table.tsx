import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Pagination, Table } from 'components/common/common';
import { InterviewsTableRow } from 'components/interviews/common/types/types';
import {
  getInterviewsColumns,
  getInterviewsRows,
} from 'components/interviews/helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
  usePagination,
} from 'hooks/hooks';
import { Column } from 'react-table';
import { interviewsActions } from 'store/actions';

import styles from './styles.module.scss';

const InterviewTable: FC = () => {
  const { page, handlePageChange } = usePagination({
    queryName: 'interviewsPage',
  });
  const dispatch = useAppDispatch();
  const { interviews, totalInterviewsNumber } = useAppSelector(
    (state) => state.interviews,
  );

  useEffect(() => {
    dispatch(
      interviewsActions.getInterviews({
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page]);

  const columns = useMemo<Column<InterviewsTableRow>[]>(() => {
    return getInterviewsColumns();
  }, []);

  const data: InterviewsTableRow[] = getInterviewsRows(interviews);

  return (
    <div className={styles.table}>
      <Table data={data} columns={columns} />
      <Pagination
        currentPage={page}
        onPageChange={handlePageChange}
        pageSize={PaginationDefaultValue.DEFAULT_COUNT}
        totalCount={totalInterviewsNumber}
      />
    </div>
  );
};

export { InterviewTable };
