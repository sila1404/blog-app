import { verifyToken } from "@/helper/verifyToken";
import type { ICreatePostInput } from "../admin-types";
import { App } from "@/shared/App";

export type PostResponse = {
	message: string;
};

export function createPostHTTP(input: ICreatePostInput) {
	const { headers } = verifyToken();
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<PostResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/posts`, {
			method: "POST",
			headers,
			body: JSON.stringify(input),
		});
		const data = await res.json();

		if (!res.ok) {
			reject(data);
		}
		resolve(data);
	});
}
