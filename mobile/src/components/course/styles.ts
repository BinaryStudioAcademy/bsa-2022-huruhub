import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  h1: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 10,
  },
  h2: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 30,
  },
  text: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 19.5,
  },
  currentCategory: {
    alignSelf: 'flex-start',
    maxWidth: '50%',
    height: 60,
  },
  editIconContainer: {
    marginTop: 10,
    marginRight: 10,
  },
});

export { styles };
