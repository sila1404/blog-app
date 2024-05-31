// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function myDebounce(func: any, delay: number) {
	let debounceTimer: number | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (...args: any[]) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func(...args), delay);
	};
}
