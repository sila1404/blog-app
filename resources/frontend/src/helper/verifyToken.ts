import { getUserData } from "./getUserData";

export function verifyToken() {
	const userdata = getUserData();

	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${userdata?.token}`,
		},
	};

	return config;
}
