import { Model } from 'objection';
import { BaseModel } from './baseModel';

export class Users extends BaseModel {
  static get tableName() {
    return 'users';
  }

  role_id!: number;
  name!: string;
  firebase_id!: string;
  password!: string;
  email!: string;
  is_active!: boolean;
  created_by!: number;
  updated_by!: number;

  static relationMappings = {
    roleData: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/role_masters', // path to RoleMasters model
      join: {
        from: 'users.role_id',
        to: 'role_masters.id',
      },
    },
    projects: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/projects', // path to Projects model
      join: {
        from: 'users.id',
        to: 'projects.manager_id',
      },
    },
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'firebase_id', 'password', 'email'],
      properties: {
        id: { type: 'string' },
        role_id: { type: 'integer' },
        name: { type: 'string' },
        firebase_id: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        is_active: { type: 'boolean' },
        created_by: { type: 'integer' },
        updated_by: { type: 'integer' },
        created_at: {
          type: 'string',
          format: 'date-time',
        },
        updated_at: {
          type: 'string',
          format: 'date-time',
        },
      },
    };
  }
}
