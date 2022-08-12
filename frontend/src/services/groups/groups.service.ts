import { ApiPath, GroupsApiPath, HttpMethod } from 'common/enums/enums';
import { EntityPagination, GroupsItemResponseDto } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GroupsApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<EntityPagination<GroupsItemResponseDto>> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { GroupsApi };
