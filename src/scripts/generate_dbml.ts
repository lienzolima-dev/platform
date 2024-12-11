import * as schema from "../db/schema";
import { sqliteGenerate } from "drizzle-dbml-generator"; // Using Postgres for this example

const out = "./schema.dbml";
const relational = true;

sqliteGenerate({ schema, out, relational });
