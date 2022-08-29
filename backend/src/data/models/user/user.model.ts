import { AnyQueryBuilder, Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Group, UserDetails } from '../models';

class User extends Abstract {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public static override modifiers = {
    selectIdEmail(builder: AnyQueryBuilder): void {
      builder.select('id', 'email');
    },
    selectFullName(builder: AnyQueryBuilder): void {
      builder.select('fullName');
    },
    withoutPassword(builder: AnyQueryBuilder): void {
      builder.select('id', 'email', 'createdAt', 'updatedAt');
    },
  };

  public static override get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: Model.ManyToManyRelation,
        modelClass: Group,
        join: {
          from: `${DbTableName.USERS}.id`,
          through: {
            from: `${DbTableName.USERS_TO_GROUPS}.userId`,
            to: `${DbTableName.USERS_TO_GROUPS}.groupId`,
          },
          to: `${DbTableName.GROUPS}.id`,
        },
      },
      userDetails: {
        relation: Model.HasOneRelation,
        modelClass: UserDetails,
        join: {
          from: `${DbTableName.USERS}.id`,
          to: `${DbTableName.USER_DETAILS}.userId`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.USERS;
  }
}

export { User };
