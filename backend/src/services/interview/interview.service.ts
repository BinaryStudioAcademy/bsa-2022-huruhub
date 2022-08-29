import {
  ExceptionMessage,
  InterviewStatus,
  PermissionKey,
} from '~/common/enums/enums';
import {
  EntityPagination,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllResponseDto,
  InterviewsGetOtherItemResponseDto,
  InterviewsGetOtherRequestDto,
  InterviewsResponseDto,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';
import { interview as interviewRep } from '~/data/repositories/repositories';
import { InterviewsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

type Constructor = {
  interviewRepository: typeof interviewRep;
};

class Interview {
  #interviewRepository: typeof interviewRep;

  public constructor({ interviewRepository }: Constructor) {
    this.#interviewRepository = interviewRepository;
  }

  public async getAll(args: {
    userId: number;
    permissions: PermissionsGetAllItemResponseDto[];
  }): Promise<InterviewsGetAllResponseDto> {
    const { userId, permissions } = args;
    const hasInterviewsPermission = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
      userPermissions: permissions,
    });

    if (!hasInterviewsPermission) {
      return this.getByUserId(userId);
    }

    const interviews = await this.#interviewRepository.getAll();

    return {
      items: interviews,
    };
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#interviewRepository.getById(id);

    return interview ?? null;
  }

  public async create({
    categoryId,
    intervieweeUserId,
    status,
  }: InterviewsCreateRequestDto): Promise<InterviewsResponseDto> {
    const interviewByUserIdAndCategoryId =
      await this.getInterviewByIntervieweeUserIdAndCategoryId(
        intervieweeUserId,
        categoryId,
      );

    const hasInterview = Boolean(interviewByUserIdAndCategoryId);

    if (
      hasInterview &&
      interviewByUserIdAndCategoryId?.status !== InterviewStatus.REJECTED
    ) {
      throw new InterviewsError();
    }

    return this.#interviewRepository.create({
      categoryId,
      intervieweeUserId,
      status,
    });
  }

  public async getPassedInterviewsCategoryIdsByUserId(
    intervieweeUserId: number,
  ): Promise<number[]> {
    const interviewsByUserId =
      await this.#interviewRepository.getPassedInterviewsByUserId(
        intervieweeUserId,
      );

    return interviewsByUserId.map((interview) => interview.categoryId);
  }

  public getInterviewByIntervieweeUserIdAndCategoryId(
    intervieweeUserId: number,
    categoryId: number,
  ): Promise<InterviewsResponseDto | null> {
    return this.#interviewRepository.getInterviewByIntervieweeUserIdAndCategoryId(
      intervieweeUserId,
      categoryId,
    );
  }

  public async getByUserId(
    userId: number,
  ): Promise<InterviewsGetAllResponseDto> {
    const interviews = await this.#interviewRepository.getByUserId(userId);

    return {
      items: interviews,
    };
  }

  public async getOtherByInterviewId({
    interviewId,
    count,
    page,
  }: InterviewsGetOtherRequestDto): Promise<
    EntityPagination<InterviewsGetOtherItemResponseDto>
  > {
    const interview = await this.getById(interviewId);

    if (!interview) {
      throw new InterviewsError({
        message: ExceptionMessage.INTERVIEW_DOES_NOT_EXIST,
      });
    }

    const intervieweeUserId = interview.interviewee.id;
    const zeroIndexPage = page - 1;

    return this.#interviewRepository.getOtherByInterviewId({
      interviewId,
      intervieweeUserId,
      count,
      page: zeroIndexPage,
    });
  }
}

export { Interview };
