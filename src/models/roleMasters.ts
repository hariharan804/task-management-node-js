import { Model } from "objection";

class RoleMasters extends Model {
  static get tableName() {
    return "role_masters";
  }

  id!: number;
  name!: string;
  description?: string;
  is_active?: boolean;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        is_active: { type: "boolean" },
        updated_by: { type: "integer" },
        created_by: { type: "integer" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  $beforeInsert() {
    const now = new Date();
    this.created_at = now.toISOString();
    this.updated_at = this.created_at;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default RoleMasters;
