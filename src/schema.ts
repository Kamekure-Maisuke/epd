import {
	date,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 20 }).notNull(),
	birthplace: varchar("birthplace", { length: 10 }),
	birthDate: date("birth_date"),
	generation: integer("generation"),
	createdAt: timestamp("created_at").defaultNow(),
});
