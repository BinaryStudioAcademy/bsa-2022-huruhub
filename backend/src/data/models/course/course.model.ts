import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory, MenteesToMentors, User, Vendor } from '../models';

class Course extends Abstract {
  public 'title': string;

  public 'description': string;

  public 'url': string;

  public 'imageUrl': string;

  public 'vendorId': number;

  public 'courseCategoryId': number;

  public 'originalId': string;

  public static override get relationMappings(): RelationMappings {
    return {
      vendor: {
        relation: Model.HasOneRelation,
        modelClass: Vendor,
        join: {
          from: `${DbTableName.COURSES}.vendorId`,
          to: `${DbTableName.VENDORS}.id`,
        },
      },
      mentors: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.COURSES}.id`,
          through: {
            from: `${DbTableName.COURSES_TO_MENTORS}.courseId`,
            to: `${DbTableName.COURSES_TO_MENTORS}.userId`,
          },
          to: `${DbTableName.USERS}.id`,
        },
      },
      mentees: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.COURSES}.id`,
          through: {
            from: `${DbTableName.MENTEES_TO_MENTORS}.courseId`,
            to: `${DbTableName.MENTEES_TO_MENTORS}.menteeId`,
          },
          to: `${DbTableName.USERS}.id`,
        },
      },
      menteesToMentors: {
        relation: Model.HasManyRelation,
        modelClass: MenteesToMentors,
        join: {
          from: `${DbTableName.COURSES}.id`,
          to: `${DbTableName.MENTEES_TO_MENTORS}.courseId`,
        },
      },
      category: {
        relation: Model.HasOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.COURSES}.courseCategoryId`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.COURSES;
  }
}

export { Course };
