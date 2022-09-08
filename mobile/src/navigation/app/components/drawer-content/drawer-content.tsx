import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from 'react';

import logo from '~/assets/images/logo.png';
import { AppScreenName, RootScreenName } from '~/common/enums/enums';
import {
  Image,
  Link,
  SafeAreaView,
  ScrollView,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import {
  NAVIGATION_ITEMS,
  NO_AUTH_NAVIGATION_ITEMS,
} from '~/navigation/app/common/constants';
import {
  BecomeMentor,
  DrawerList,
} from '~/navigation/app/components/components';
import { coursesActions } from '~/store/actions';

import { styles } from './styles';

const DrawerContent: FC<DrawerContentComponentProps> = ({ state }) => {
  const dispatch = useAppDispatch();
  const focusedRouteName = state.routes[state.index].name as AppScreenName;
  const allowedRoutes = state.routes.map((item) => item.name);

  const { user, isMentorBecomingVisible, dataBecomeMentorStatus } =
    useAppSelector(({ auth, courses }) => ({
      user: auth.user,
      isMentorBecomingVisible: courses.isMentorBecomingVisible,
      dataBecomeMentorStatus: courses.dataBecomeMentorStatus,
    }));

  const visibleNavigationItems = user
    ? NAVIGATION_ITEMS.filter((item) => item.isVisible)
    : NO_AUTH_NAVIGATION_ITEMS.filter((item) => item.isVisible);

  const handleBecomeMentor = (): void => {
    dispatch(coursesActions.becomeMentor());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: getImageUri(logo) }} style={styles.logo} />
        </View>
        {visibleNavigationItems.map(({ name, subroutes }, index) => (
          <View style={styles.listWrapper} key={name}>
            {Boolean(index) && <View style={styles.listBorder} />}
            <DrawerList
              name={name}
              subroutes={subroutes.filter((item) =>
                allowedRoutes.includes(item.name),
              )}
              focusedRouteName={focusedRouteName}
            />
          </View>
        ))}
        {isMentorBecomingVisible && user && (
          <BecomeMentor
            dataStatus={dataBecomeMentorStatus}
            onPress={handleBecomeMentor}
          />
        )}
      </ScrollView>
      {!user && (
        <View style={styles.signInWrapper}>
          <Link label="Sign in" to={`/${RootScreenName.AUTH}`} />
        </View>
      )}
    </SafeAreaView>
  );
};

export { DrawerContent };
