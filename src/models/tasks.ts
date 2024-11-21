import { Model } from "objection";

class Tasks extends Model {
  static get tableName() {
    return "tasks";
  }

  id!: number;
  project_id!: number;
  assigned_by!: number;
  assigned_to?: number;
  name!: string;
  description?: string;
  is_active!: boolean;
  is_completed!: boolean;
  status!: string;
  estimated_time!: number;
  start_at!: string;
  end_at!: string;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/projects", // path to Projects model
      join: {
        from: "tasks.project_id",
        to: "projects.id",
      },
    },
    assignedBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/users", // path to Users model
      join: {
        from: "tasks.assigned_by",
        to: "users.id",
      },
    },
    assignedTo: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/users", // path to Users model
      join: {
        from: "tasks.assigned_to",
        to: "users.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        project_id: { type: "integer" },
        assigned_by: { type: "integer" },
        assigned_to: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        is_active: { type: "boolean" },
        is_completed: { type: "boolean" },
        status: { type: "string" },
        estimated_time: { type: "integer" },
        start_at: { type: "string", format: "date-time" },
        end_at: { type: "string", format: "date-time" },
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

export default Tasks;
