import { Model } from 'objection';

export class BaseModel extends Model {
  // indexed columns
  id!: string;
  client_id!: string;
  // basic columns
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
  created_by?: string;

  static get idColumn() {
    return 'id'; // Default primary key column
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
