import { verifyToken } from "@/helper/verifyToken";
import { App } from "@/shared/App";

export type DeletePostResponse = {
  message: string
}
export function deletePostHTTP(postId: number) {
	const { headers } = verifyToken();
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<DeletePostResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/posts/${postId}`, {
			method: "DELETE",
			headers,
		});
		const data = await res.json();

		if (!res.ok) {
			reject(data);
		}
		resolve(data);
	});
}

