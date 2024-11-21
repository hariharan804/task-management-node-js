import { Model } from "objection";

class ProjectMembers extends Model {
  static get tableName() {
    return "project_members";
  }

  id!: number;
  project_id!: number;
  user_id!: number;
  is_active!: boolean;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/projects", // path to Projects model
      join: {
        from: "project_members.project_id",
        to: "projects.id",
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/users", // path to Users model
      join: {
        from: "project_members.user_id",
        to: "users.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["project_id", "user_id"],
      properties: {
        id: { type: "integer" },
        project_id: { type: "integer" },
        user_id: { type: "integer" },
        is_active: { type: "boolean" },
        created_by: { type: "integer" },
        updated_by: { type: "integer" },
        created_at: {
          type: "string",
          format: "date-time",
        },
        updated_at: {
          type: "string",
          format: "date-time",
        },
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

export default ProjectMembers;
