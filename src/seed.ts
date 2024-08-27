import { db } from "./db";
import { members } from "./schema";

// 一旦初期データ投入
await db.insert(members).values([
	{
		name: "白石麻衣",
		birthplace: "東京都",
		birthDate: "1992-08-20",
		generation: 1,
	},
	{
		name: "松村沙友理",
		birthplace: "大阪府",
		birthDate: "1992-08-27",
		generation: 1,
	},
	{
		name: "橋本奈々美",
		birthplace: "北海道",
		birthDate: "1993-02-20",
		generation: 1,
	},
]);
