import type { ILoginInput } from "../auth-type";
import { App } from "@/shared/App";

export type LoginResponse = {
  user: {
    id: number,
    name: string,
    email: string
  },
  token: string
};

export function loginUserHTTP(input: ILoginInput) {
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<LoginResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(input),
		});
		const data = await res.json();

		if (!res.ok) {
			reject(data);
		}
		resolve(data);
	});
}
