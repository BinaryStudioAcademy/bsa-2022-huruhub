import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { AppScreenName, DataStatus, PermissionKey } from '~/common/enums/enums';
import {
  Icon,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { checkHasPermission, getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useState,
  useWindowDimensions,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import { CourseCategory, CourseDescription } from './components/components';
import { CourseModules } from './components/course-modules/course-modules';
import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {
    user,
    course,
    dataStatus,
    courseModules,
    modulesDataStatus,
    mentors,
  } = useAppSelector(({ auth, courses, courseModules }) => ({
    user: auth.user,
    course: courses.course,
    mentors: courses.mentors,
    dataStatus: courses.dataStatus,
    courseModules: courseModules.courseModules,
    modulesDataStatus: courseModules.dataStatus,
  }));

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const courseIsLoading = dataStatus === DataStatus.PENDING;
  const moduleIsLoading = modulesDataStatus === DataStatus.PENDING;

  const currentCategory = course?.category;

  const handleEditModeToggle = (): void => {
    navigation.navigate(AppScreenName.EDIT_COURSE_CATEGORY);
  };

  const hasEditCategoryPermission = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const handleExpandedToggle = (): void => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  useEffect(() => {
    if (course) {
      dispatch(courseModulesActions.getCourseModules({ courseId: course.id }));
      dispatch(
        coursesActions.getMentorsByCourseId({
          courseId: course.id,
          filteringOpts: {
            mentorName: '',
          },
        }),
      );
    }
  }, [course]);

  useEffect(() => {
    dispatch(coursesActions.updateVisibilityBecomeMentor());

    return () => {
      dispatch(coursesActions.setBecomeMentorInvisible());
    };
  }, [mentors]);

  useFocusEffect(
    useCallback(() => {
      return () => setIsDescriptionExpanded(false);
    }, []),
  );

  if (courseIsLoading) {
    return <Spinner isOverflow />;
  }

  if (!course) {
    return <Text>There is no course with provided id </Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>{course?.title}</Text>
        <View style={styles.currentCategory}>
          <CourseCategory
            keyName={currentCategory?.key ?? 'unknown'}
            name={currentCategory?.name ?? 'Unknown'}
            isActive={false}
          />
          {hasEditCategoryPermission && (
            <Pressable
              style={styles.editIconContainer}
              onPress={handleEditModeToggle}
            >
              <Icon width={25} height={25} name="edit" color="white" />
            </Pressable>
          )}
        </View>

        <Image
          style={styles.image}
          source={{
            uri: course?.imageUrl ?? getImageUri(defaultCourseImage),
          }}
        />
        <Text style={styles.h2}>About this course</Text>
        {Boolean(course.description) && (
          <CourseDescription
            description={course.description}
            isExpanded={isDescriptionExpanded}
            handleExpandedToggle={handleExpandedToggle}
            width={width}
          />
        )}
        <CourseModules
          courseModules={courseModules}
          isLoading={moduleIsLoading}
        />
      </View>
    </ScrollView>
  );
};

export { Course };
