import { eq } from "drizzle-orm";
import { db } from "./db";
import { members } from "./schema";

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
