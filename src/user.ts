import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";

/**
 * ユーザー作成
 */
export const createUser = async (name: string, password: string) => {
	const hash = await Bun.password.hash(password);
	return db.insert(users).values({ name, password: hash }).returning();
};

/**
 * ユーザー認証
 */
export const authenticateUser = async (name: string, password: string) => {
	const user = await db.select().from(users).where(eq(users.name, name));
	if (user.length === 0) return null;

	const isMatch = await Bun.password.verify(password, user[0].password);
	return isMatch ? user[0] : null;
};
