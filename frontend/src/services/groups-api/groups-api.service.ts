import {
  ApiPath,
  ContentType,
  GroupsApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EntityPagination,
  GroupsCreateRequestDto,
  GroupsGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupUpdateRequestArgumentsDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GroupsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
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

  public getById(id: number): Promise<GroupsGetByIdResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}/${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(
    payload: GroupsCreateRequestDto,
  ): Promise<GroupsItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public update({
    payload,
    id,
  }: GroupUpdateRequestArgumentsDto): Promise<GroupsItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GROUPS}${GroupsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { GroupsApi };
