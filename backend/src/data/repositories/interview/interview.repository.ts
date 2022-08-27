import { InterviewStatus } from '~/common/enums/enums';
import {
  InterviewsByIdResponseDto,
  InterviewsCreateRequestDto,
  InterviewsGetAllItemResponseDto,
} from '~/common/types/types';
import { Interview as InterviewM } from '~/data/models/models';

type Constructor = {
  InterviewModel: typeof InterviewM;
};

class Interview {
  #InterviewModel: typeof InterviewM;

  public constructor({ InterviewModel }: Constructor) {
    this.#InterviewModel = InterviewModel;
  }

  public getAll(): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public async getById(id: number): Promise<InterviewsByIdResponseDto | null> {
    const interview = await this.#InterviewModel
      .query()
      .select()
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .findById(id)
      .castTo<InterviewsByIdResponseDto>();

    return interview ?? null;
  }

  public create({
    status,
    categoryId,
    intervieweeUserId,
  }: InterviewsCreateRequestDto): Promise<InterviewM> {
    return this.#InterviewModel
      .query()
      .insert({
        status,
        categoryId,
        intervieweeUserId,
      })
      .execute();
  }

  public getPassedInterviewsByUserId(
    intervieweeUserId: number,
  ): Promise<InterviewM[]> {
    return this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhere('status', InterviewStatus.COMPLETED)
      .execute();
  }

  public async getInterviewByIntervieweeUserIdAndCategoryId(
    intervieweeUserId: number,
    categoryId: number,
  ): Promise<InterviewM | null> {
    const interview = await this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhere({ categoryId })
      .first();

    return interview ?? null;
  }

  public getByUserId(
    userId: number,
  ): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .select()
      .where('intervieweeUserId', userId)
      .orWhere('interviewerUserId', userId)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }

  public getOtherByInterviewId(
    id: number,
    intervieweeUserId: number,
  ): Promise<InterviewsGetAllItemResponseDto[]> {
    return this.#InterviewModel
      .query()
      .where({ intervieweeUserId })
      .andWhereNot('interviews.id', id)
      .withGraphJoined('courseCategory')
      .withGraphJoined('interviewee(withoutPassword).[userDetails]')
      .withGraphJoined('interviewer(withoutPassword).[userDetails]')
      .modifiers({
        withoutPassword(builder) {
          builder.select('id', 'email', 'createdAt', 'updatedAt');
        },
      })
      .castTo<InterviewsGetAllItemResponseDto[]>()
      .execute();
  }
}

export { Interview };
