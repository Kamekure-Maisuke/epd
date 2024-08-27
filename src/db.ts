import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

export const client = new PGlite("tmp");
export const db = drizzle(client);
