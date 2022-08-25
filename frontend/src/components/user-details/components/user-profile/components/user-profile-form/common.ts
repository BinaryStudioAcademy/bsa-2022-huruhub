import { UserGender } from 'common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from 'common/types/types';

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
};

export { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD };