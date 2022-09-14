import { CourseUpdateMentoringDto } from 'common/types/types';
import {
  CoursesMentoringTableActionsProps,
  CoursesMentoringTableRow,
  CoursesMentoringTableTitleProps,
} from 'components/my-courses/common/types/types';
import {
  StudentsCountCell,
  TitleCell,
} from 'components/my-courses/components/components';
import { Column } from 'react-table';

const getCoursesMentoringColumns = (
  onCourseEdit: (course: CourseUpdateMentoringDto) => void,
): Column<CoursesMentoringTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: (
        course: CoursesMentoringTableRow,
      ): CoursesMentoringTableTitleProps => ({
        id: course.id,
        title: course.title,
      }),
      Cell: TitleCell,
      width: 800,
    },
    {
      Header: 'Students count',
      accessor: ({
        id,
        studentsCount,
      }: CoursesMentoringTableRow): CoursesMentoringTableActionsProps => ({
        onEdit: onCourseEdit,
        course: {
          courseId: id,
          studentsCount,
        },
      }),
      Cell: StudentsCountCell,
      width: 400,
    },
  ];
};

export { getCoursesMentoringColumns };