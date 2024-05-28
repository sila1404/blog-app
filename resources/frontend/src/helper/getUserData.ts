import type { LoginResponse } from "@/views/auth/actions/LoginUser";

export function getUserData(): LoginResponse | undefined {
	const userData = localStorage.getItem("userData");

	if(typeof userData  === "object") {
		window.location.href = "/"
	}

	try {
		if (typeof userData !== "object") {
			const connectedUser: LoginResponse = JSON.parse(userData);
			return connectedUser;
		}
	} catch (error) {
		console.log(error);
	}
}
