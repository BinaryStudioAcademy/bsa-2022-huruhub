import { ContentType } from '~/common/enums/enums';
import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { userDetails as userDetailsRep } from '~/data/repositories/repositories';
import { UserDetailsError } from '~/exceptions/exceptions';
import { file as fileServ } from '~/services/services';

type Constructor = {
  userDetailsRepository: typeof userDetailsRep;
  fileService: typeof fileServ;
  avatarBucketName: string;
};

class UserDetails {
  #userDetailsRepository: typeof userDetailsRep;

  #fileService: typeof fileServ;

  #avatarBucketName: string;

  public constructor({
    userDetailsRepository,
    fileService,
    avatarBucketName,
  }: Constructor) {
    this.#userDetailsRepository = userDetailsRepository;
    this.#fileService = fileService;
    this.#avatarBucketName = avatarBucketName;
  }

  public async update(
    userId: number,
    userDetailsUpdateInfoRequestDto: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto | null> {
    const hasTelegram = Boolean(
      userDetailsUpdateInfoRequestDto.telegramUsername,
    );
    const { telegramUsername } = userDetailsUpdateInfoRequestDto;

    userDetailsUpdateInfoRequestDto = {
      ...userDetailsUpdateInfoRequestDto,
      telegramUsername: hasTelegram ? telegramUsername : null,
    };

    const userDetails = await this.#userDetailsRepository.update(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails ?? null;
  }

  public async create(
    userId: number,
    userDetailsUpdateInfoRequestDto: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const userDetails = await this.#userDetailsRepository.create(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails;
  }

  public async getByUserId(
    userId: number,
  ): Promise<UserDetailsResponseDto | null> {
    const userDetails = await this.#userDetailsRepository.getByUserId(userId);

    return userDetails ?? null;
  }

  public async uploadAvatar(
    userId: number,
    file: Buffer,
  ): Promise<UserDetailsResponseDto> {
    const user = await this.#userDetailsRepository.getByUserId(userId);

    if (!user) {
      throw new UserDetailsError();
    }

    const newFile = await this.#fileService.uploadFile({
      bucket: this.#avatarBucketName,
      contentType: ContentType.IMAGE,
      file,
      fileName: `${user.id}/${Date.now().toString()}`,
    });

    return this.#userDetailsRepository.updateAvatarFileId(user.id, newFile.id);
  }
}

export { UserDetails };
