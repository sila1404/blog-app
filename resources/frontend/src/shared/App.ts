interface IApt {
	apiStatus: "development" | "production";
	development: {
		baseURL: string;
		apiURL: string;
	};
	production: {
		baseURL: string;
		apiURL: string;
	};
}

const appApi: IApt = {
	apiStatus: "development",
	development: {
		baseURL: "http://127.0.0.1:8000",
		apiURL: "http://127.0.0.1:8000/api",
	},
	production: {
		baseURL: "",
		apiURL: "",
	},
};

export const App =
	appApi.apiStatus === "development" ? appApi.development : appApi.production;
