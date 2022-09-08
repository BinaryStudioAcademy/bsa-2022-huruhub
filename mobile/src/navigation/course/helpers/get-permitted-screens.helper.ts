import {
  PermissionsGetAllItemResponseDto,
  TabNavigationItem,
} from '~/common/types/types';
import { checkHasPermission } from '~/helpers/helpers';

const getPermittedScreens = (
  screens: TabNavigationItem[],
  userPermissions: PermissionsGetAllItemResponseDto[],
): TabNavigationItem[] => {
  return screens.filter((screen) => {
    return checkHasPermission({
      permissionKeys: screen.permissions,
      userPermissions: userPermissions,
    });
  });
};

export { getPermittedScreens };
