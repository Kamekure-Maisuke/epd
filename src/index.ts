import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import {
	createMember,
	deleteMember,
	fetchMember,
	fetchMembers,
	updateMember,
} from "./member";
import { fetchSong, fetchSongs } from "./songs";
import { authenticateUser, createUser } from "./user";

const app = new Elysia();

app.use(swagger());

app.use(
	jwt({
		name: "jwt",
		secret: "SAMPLE",
	}),
);

// 認証ミドルウェア
// @ts-expect-error
const auth = app.derive(({ jwt, cookie, set }) => ({
	auth: async () => {
		const token = cookie.auth;
		if (!token) {
			set.status = 401;
			throw new Error("Unauthorized");
		}
		const payload = await jwt.verify(token.value);
		if (!payload) {
			set.status = 401;
			throw new Error("Invalid token");
		}
		return payload;
	},
}));

/**
 * ユーザー登録
 */
app.post(
	"/register",
	async ({ body }) => {
		const user = await createUser(body.name, body.password);
		return { message: "User registered successfully", user };
	},
	{
		body: t.Object({
			name: t.String(),
			password: t.String(),
		}),
	},
);

/**
 * ログイン
 */
app.post(
	"/login",
	// @ts-expect-error
	async ({ body, jwt, cookie: { auth } }) => {
		const user = await authenticateUser(body.name, body.password);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const token = await jwt.sign({ id: user.id, name: user.name });

		auth.set({
			value: token,
			httpOnly: true,
			maxAge: 7 * 86400,
		});

		return { token };
	},
	{
		body: t.Object({
			name: t.String(),
			password: t.String(),
		}),
	},
);

/**
 * ログアウト
 */
app.post("/logout", ({ cookie }) => {
	cookie.auth.set({
		value: "",
		maxAge: 0,
	});
	return { message: "Logged out successfully" };
});

/**
 * 全メンバー取得
 */
// @ts-expect-error
app.get("/nogi/members", async ({ auth }) => {
	await auth();
	return fetchMembers();
});

/**
 * 個別メンバー取得
 */
app.get("/nogi/members/:id", ({ params: { id } }) => fetchMember(id), {
	params: t.Object({
		id: t.Numeric(),
	}),
});

/**
 * メンバー作成
 */
app.post("/nogi/members", ({ body }) => createMember(body), {
	body: t.Object({
		name: t.String(),
		birthplace: t.Optional(t.String()),
		birthDate: t.Optional(t.String()),
		generation: t.Optional(t.Number()),
	}),
});

/**
 * メンバー更新
 */
app.put(
	"/nogi/members/:id",
	({ params: { id }, body }) => updateMember(Number(id), body),
	{
		params: t.Object({
			id: t.Numeric(),
		}),
		body: t.Object({
			name: t.Optional(t.String()),
			birthplace: t.Optional(t.String()),
			birthDate: t.Optional(t.String()),
			generation: t.Optional(t.Number()),
		}),
	},
);

/**
 * メンバー削除
 */
app.delete("/nogi/members/:id", ({ params: { id } }) => deleteMember(id), {
	params: t.Object({
		id: t.Numeric(),
	}),
});

/**
 * 全曲取得
 */
app.get("/nogi/songs", () => {
	return fetchSongs();
});

/**
 * 個別曲取得
 */
app.get("/nogi/songs/:id", ({ params: { id } }) => fetchSong(id), {
	params: t.Object({
		id: t.Numeric(),
	}),
});

app.listen(3000);
