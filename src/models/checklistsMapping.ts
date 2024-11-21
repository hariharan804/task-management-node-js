import { Model } from "objection";

class ChecklistsMapping extends Model {
  static get tableName() {
    return "checklists_mapping";
  }

  id!: number;
  checklist_id!: number;
  task_id!: number;
  created_by!: number;
  updated_by!: number;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    checklist: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/checklists", // path to Checklists model
      join: {
        from: "checklists_mapping.checklist_id",
        to: "checklists.id",
      },
    },
    task: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/tasks", // path to Tasks model
      join: {
        from: "checklists_mapping.task_id",
        to: "tasks.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["checklist_id", "task_id"],
      properties: {
        id: { type: "integer" },
        checklist_id: { type: "integer" },
        task_id: { type: "integer" },
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

export default ChecklistsMapping;
