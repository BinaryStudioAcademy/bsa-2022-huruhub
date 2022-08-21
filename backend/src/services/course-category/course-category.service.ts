import {
  CategoryGetAllResponseDto,
  CourseCategoryGetResponseDto,
} from '~/common/types/types';
import { courseCategory as courseCategoryRep } from '~/data/repositories/repositories';

type Constructor = {
  courseCategoryRepository: typeof courseCategoryRep;
};

class CourseCategory {
  #courseCategoryRepository: typeof courseCategoryRep;

  public constructor({ courseCategoryRepository }: Constructor) {
    this.#courseCategoryRepository = courseCategoryRepository;
  }

  public async getAll(): Promise<CategoryGetAllResponseDto> {
    const categories = await this.#courseCategoryRepository.getAll();

    return {
      items: categories.map((category) => ({
        id: category.id,
        key: category.key,
        name: category.name,
      })),
    };
  }

  public getByKey(key: string): Promise<CourseCategoryGetResponseDto | null> {
    return this.#courseCategoryRepository.getByKey(key);
  }
}

export { CourseCategory };