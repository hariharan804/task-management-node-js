import { Model } from "objection";

class Notifications extends Model {
  static get tableName() {
    return "notifications";
  }

  id!: number;
  user_id!: number;
  message!: string;
  is_read!: boolean;
  created_at!: string;
  updated_at!: string;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/users", // path to Users model
      join: {
        from: "notifications.user_id",
        to: "users.id",
      },
    },
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "message"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        message: { type: "string" },
        is_read: { type: "boolean" },
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

export default Notifications;
