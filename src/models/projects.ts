import { Model } from "objection";

class Projects extends Model {
  static get tableName() {
    return "projects";
  }

  id!: number;
  name!: string;
  description?: string;
  manager_id!: number;
  is_active!: boolean;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    manager: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/users", // path to Users model
      join: {
        from: "projects.manager_id",
        to: "users.id",
      },
    },
    projectMembers: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/project_members", // path to ProjectMembers model
      join: {
        from: "projects.id",
        to: "project_members.project_id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        manager_id: { type: "integer" },
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

export default Projects;
