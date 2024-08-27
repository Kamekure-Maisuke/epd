import { eq } from "drizzle-orm";
import { db } from "./db";
import { songs } from "./schema";

/**
 ** 全曲一覧取得
 */
export const fetchSongs = () => {
	return db.select().from(songs);
};

/**
 * 個別曲取得
 */
export const fetchSong = (id: number) => {
	return db.select().from(songs).where(eq(songs.id, id));
};
