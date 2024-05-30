import { verifyToken } from "@/helper/verifyToken";
import { App } from "@/shared/App";

export type LogoutResponse = {
	message: string;
};

export function logoutUserHTTP(userId: number) {
	const { headers } = verifyToken();
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<LogoutResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/logout`, {
			method: "POST",
			headers,
			body: JSON.stringify({ userId }),
		});
		const data = await res.json();

		if (!res.ok) {
			reject(data);
		}
		resolve(data);
	});
}
