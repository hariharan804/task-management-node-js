import { Model } from "objection";

class RolesPermissionsMapping extends Model {
  static get tableName() {
    return "roles_permissions_mapping";
  }

  id!: number;
  role_id!: number;
  permission_id!: number;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/role_masters", // path to RoleMasters model
      join: {
        from: "roles_permissions_mapping.role_id",
        to: "role_masters.id",
      },
    },
    permission: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/permissions", // path to Permissions model
      join: {
        from: "roles_permissions_mapping.permission_id",
        to: "permissions.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["role_id", "permission_id"],
      properties: {
        id: { type: "integer" },
        role_id: { type: "integer" },
        permission_id: { type: "integer" },
        created_by: { type: "integer" },
        updated_by: { type: "integer" },
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

export default RolesPermissionsMapping;
