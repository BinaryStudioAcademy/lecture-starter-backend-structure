import { type Knex } from "knex";
import { Model } from "objection";

const connectDatabase = (knexInstance: Knex): void => {
  Model.knex(knexInstance);
};

export { connectDatabase };

export { Abstract as AbstractModel } from "./abstract.model.js";
