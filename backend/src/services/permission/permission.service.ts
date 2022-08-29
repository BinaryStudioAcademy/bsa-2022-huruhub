import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  PermissionsGetAllItemResponseDto,
  PermissionsGetAllResponseDto,
} from '~/common/types/types';
import { permission as permissionRep } from '~/data/repositories/repositories';

type Constructor = {
  permissionRepository: typeof permissionRep;
};

class Permission {
  #permissionRepository: typeof permissionRep;

  public constructor({ permissionRepository }: Constructor) {
    this.#permissionRepository = permissionRepository;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<PermissionsGetAllItemResponseDto>
  > {
    const ZERO_INDEXED_PAGE = page - 1;
    const permissions = await this.#permissionRepository.getAll({
      page: ZERO_INDEXED_PAGE,
      count,
    });

    return {
      items: permissions.items.map((permission) => ({
        id: permission.id,
        key: permission.key,
        name: permission.name,
      })),
      total: permissions.total,
    };
  }

  public async getByIds(ids: number[]): Promise<PermissionsGetAllResponseDto> {
    const permissions = await this.#permissionRepository.getByIds(ids);

    return {
      items: permissions.map((permission) => ({
        id: permission.id,
        key: permission.key,
        name: permission.name,
      })),
    };
  }
}

export { Permission };
