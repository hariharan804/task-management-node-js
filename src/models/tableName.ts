import { BaseModel } from './baseModel';

export class TableName extends BaseModel {
  static get tableName() {
    return 'table_name';
  }

  colName!: string;

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'string' },
        colName: { type: 'string' },
      },
    };
  }
}
