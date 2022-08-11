import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { FC } from 'react';

import { AuthScreenName } from '~/common/enums/enums';
import { AuthNavigationParamList } from '~/common/types/types';
import { Auth as AuthScreen } from '~/components/auth/auth';

import { SCREEN_OPTIONS } from './common/constants';

const Tab = createMaterialTopTabNavigator<AuthNavigationParamList>();

const Auth: FC = () => {
  return (
    <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
      <Tab.Screen name={AuthScreenName.SIGN_UP} component={AuthScreen} />
      <Tab.Screen name={AuthScreenName.SIGN_IN} component={AuthScreen} />
    </Tab.Navigator>
  );
};

export { Auth };
