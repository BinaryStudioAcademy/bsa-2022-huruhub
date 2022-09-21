import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AppColor,
  AppFontFamily,
  MyCoursesScreenName,
} from '~/common/enums/enums';
import { NavigationItem } from '~/common/types/types';
import { Course } from '~/navigation/course/course-stack.navigation';
import { MyCoursesTabs } from '~/navigation/my-courses/my-courses-tabs.navigation';

const SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShown: false,
};

const TAB_OPTIONS: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'none',
  },
  tabBarStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  tabBarIndicatorStyle: {
    backgroundColor: AppColor.BRAND.BLUE_100,
  },
  swipeEnabled: false,
  tabBarActiveTintColor: AppColor.TEXT.GRAY_100,
  tabBarInactiveTintColor: AppColor.TEXT.GRAY_200,
};

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: MyCoursesScreenName.MY_COURSES,
    component: MyCoursesTabs,
    permissions: [],
    isAuthRequired: false,
  },
  {
    name: MyCoursesScreenName.COURSE,
    component: Course,
    permissions: [],
    isAuthRequired: false,
  },
];

export { NAVIGATION_ITEMS, SCREEN_OPTIONS, TAB_OPTIONS };
