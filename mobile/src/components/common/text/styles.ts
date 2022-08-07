import { StyleSheet } from 'react-native';
import { AppColor } from '~/common/enums/ui/app-color.enum';
import { AppFontFamily } from '~/common/enums/ui/app-font.enum';

const styles = StyleSheet.create({
  default: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    color: AppColor.TEXT.GRAY_400,
  },
});

export { styles };
