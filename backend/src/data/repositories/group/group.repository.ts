import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { Group as GroupM } from '~/data/models/models';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<GroupM>> {
    const result = await this.#GroupModel.query().page(page, count);

    return {
      items: result.results,
      total: result.total,
    };
  }

  async create(group: { name: string; key: string }): Promise<GroupM> {
    const { name, key } = group;

    return this.#GroupModel.query().insert({
      name,
      key,
    });
  }

  async getByName(name: string): Promise<GroupM | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .first();

    return group ?? null;
  }

  async update(group: {
    id: number;
    name: string;
    key: string;
  }): Promise<GroupM | number> {
    const { id, name, key } = group;

    return await this.#GroupModel.query().where({ id }).update({
      name,
      key,
    });
  }

  async getById(id: number): Promise<GroupM | null> {
    const group = await this.#GroupModel.query().select().where({ id }).first();

    return group ?? null;
  }
}

export { Group };
