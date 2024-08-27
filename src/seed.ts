import { db } from "./db";
import { members, songs } from "./schema";

// メンバー初期データ投入
await db
	.insert(members)
	.values([
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
		{
			name: "生田絵梨花",
			birthplace: "ドイツ",
			birthDate: "1997-01-22",
			generation: 1,
		},
	])
	.onConflictDoNothing();

// 楽曲初期データ投入
await db
	.insert(songs)
	.values([
		{
			title: "ガールズルール",
			releaseDate: "2013-07-03",
			type: "シングル",
			centerId: 1,
		},
		{
			title: "僕がいる場所",
			releaseDate: "2015-01-07",
			type: "アルバム",
			centerId: 4,
		},
		{
			title: "シンクロシティ",
			releaseDate: "2018-04-25",
			type: "シングル",
			centerId: 1,
		},
	])
	.onConflictDoNothing();
