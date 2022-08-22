import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
    paddingBottom: 10,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 6,
  },
});

export { styles };