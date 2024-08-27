import { eq } from "drizzle-orm";
import {
	date,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { db } from "./db";

const members = pgTable("members", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 20 }).notNull(),
	birthplace: varchar("birthplace", { length: 10 }),
	birthDate: date("birth_date"),
	generation: integer("generation"),
	createdAt: timestamp("created_at").defaultNow(),
});

/**
 ** 全メンバー取得
 */
export const fetchMembers = () => {
	return db.select().from(members);
};

/**
 * 個別メンバー取得
 */
export const fetchMember = (id: number) => {
	return db.select().from(members).where(eq(members.id, id));
};

/**
 * メンバー作成
 */
export const createMember = (
	memberData: Omit<typeof members.$inferInsert, "id" | "createdAt">,
) => {
	return db.insert(members).values(memberData).returning();
};

/**
 * メンバー更新
 */
export const updateMember = (
	id: number,
	memberData: Partial<typeof members.$inferInsert>,
) => {
	return db
		.update(members)
		.set(memberData)
		.where(eq(members.id, id))
		.returning();
};

/**
 * メンバー削除
 */
export const deleteMember = (id: number) => {
	return db.delete(members).where(eq(members.id, id)).returning();
};
