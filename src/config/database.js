import "dotenv/config";
import {neon} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/singlestore";

const sql = neon(process.env.NEON_DB);

const db = drizzle(sql);

export {sql, db};
