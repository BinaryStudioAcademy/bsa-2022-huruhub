import { ENV, UdemyApiPath } from '~/common/enums/enums';
import { UdemyGetResponseDto } from '~/common/types/types';
import { http as httpServ } from '~/services/services';

type Constructor = {
  httpService: typeof httpServ;
  authorizationToken: string;
};

class Udemy {
  #authorizationTokenBase64: string;
  #apiBaseUrl: string;
  #httpService: typeof httpServ;

  constructor({ httpService, authorizationToken }: Constructor) {
    this.#authorizationTokenBase64 = authorizationToken;
    this.#apiBaseUrl = ENV.UDEMY.API_BASE;
    this.#httpService = httpService;
  }

  async getByUrl(url: URL): Promise<UdemyGetResponseDto> {
    const courseIdOrSlug = url.pathname;
    const headers = this.getHeaders();
    const res = await this.#httpService.get<UdemyGetResponseDto>(
      this.getRequestUrl(courseIdOrSlug),
      { headers },
    );

    return res.data;
  }

  private getHeaders(): Record<string, string> {
    const headers = {
      Authorization: `Basic ${this.#authorizationTokenBase64}`,
    };

    return headers;
  }

  private getRequestUrl(courseIdOrSlug: string): string {
    return `${this.#apiBaseUrl}${
      UdemyApiPath.COURSES
    }${courseIdOrSlug}?fields[course]=title,description,primary_category,url`;
  }
}

export { Udemy };
