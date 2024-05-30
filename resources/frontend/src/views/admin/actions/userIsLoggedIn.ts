import { verifyToken } from "@/helper/verifyToken";
import type { ICreatePostInput } from "../admin-types";
import { App } from "@/shared/App";

export type UserIsLoggedInResponse = {
	message: string;
};

export function userIsLoggedInHTTP() {
	const { headers } = verifyToken();
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<UserIsLoggedInResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/check/user/loggedin`, {
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
