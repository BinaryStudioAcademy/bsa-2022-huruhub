import { ApiPath, CoursesApiPath, HttpMethod } from '~/common/enums/enums';
import { CourseFilteringDto, CourseGetResponseDto } from '~/common/types/types';

import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class Courses {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(options: {
    filtering: CourseFilteringDto;
  }): Promise<CourseGetResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
        queryParams: {
          title: options.filtering.title,
          categoryKey: options.filtering.categoryKey,
        },
      },
    );
  }
}

export { Courses };