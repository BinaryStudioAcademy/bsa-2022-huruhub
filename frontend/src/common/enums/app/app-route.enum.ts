enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  MENTORS = '/mentors',
  EDUCATION = '/education',
  INTERVIEW = '/interviews',
  INTERVIEWS_$ID = '/interviews/:id',
  SETTINGS_BILLING = '/settings/billing',
  SETTINGS_PROFILE = '/settings/profile',
  UAM = '/uam',
  SETTINGS_APPEARANCE = '/settings/appearance',
  SETTINGS_SECURITY = '/settings/security',
  SETTINGS_MESSAGES = '/settings/messages',
  UAM_CONFIGURE_GROUP = '/uam/configure-group',
  UAM_CONFIGURE_GROUP_$ID = '/uam/configure-group/:id',
  CHATS = '/chats',
  COURSES_$ID = '/courses/:id',
  COURSES = '/courses',
  COURSES_$ID_MODULES_$ID = '/courses/:courseId/modules/:moduleId',
  ANY = '*',
}

export { AppRoute };
