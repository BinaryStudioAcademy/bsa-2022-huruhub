enum InterviewsApiPath {
  ROOT = '/',
  $ID = '/:id',
  NOTES = '/notes',
  INTERVIEWEE_USER_$ID_CATEGORIES = '/interviewee/:intervieweeUserId/categories',
  INTERVIEWEE = '/interviewee',
  CATEGORIES = '/categories',
  $ID_OTHER = '/:id/other',
  OTHER = '/other',
}

export { InterviewsApiPath };
