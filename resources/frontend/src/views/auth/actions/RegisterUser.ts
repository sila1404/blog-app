import type { IRegisterInput } from "../auth-type";
import { App } from "@/shared/App";

type RegisterResponse = {
	user: IRegisterInput;
	message: string;
};

export function createUserHTTP(input: IRegisterInput) {
	// biome-ignore lint/suspicious/noAsyncPromiseExecutor: <explanation>
	return new Promise<RegisterResponse>(async (resolve, reject) => {
		const res = await fetch(`${App.apiURL}/register`, {
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
