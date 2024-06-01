import { verifyToken } from "@/helper/verifyToken";
import type { IPostLists } from "../admin-types";
import { App } from "@/shared/App";

export type GetPostResponse = {
	data: Array<IPostLists>;
} & Record<string, string | number>;

export function getPostHTTP(page: number, query: string) {
	const { headers } = verifyToken();
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<GetPostResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/posts?page=${page}&query=${query}`, {
			method: "GET",
			headers,
		});
		const data = await res.json();

		if (!res.ok) {
			reject(data);
		}
		resolve(data);
	});
}
