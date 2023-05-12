import { trimEnd } from './utils';
import { env } from '$env/dynamic/public';

export const BaseURL: string = env.PUBLIC_API_URL ?? 'http://localhost:3000';

export type APIFetchOptions = {
	query?: Record<string, unknown>;
};

// This function is extremely work in progress - ideally you'd want something that debounces the requests
// and makes sure we don't contact the API more often than we need to
export async function fetchAPI<T = any>(path: string, options: APIFetchOptions): Promise<T> {
	const url = new URL(BaseURL + path);

	if (options.query) {
		for (const [key, value] of Object.entries(options.query)) {
			if (value != null) {
				url.searchParams.set(key, String(value));
			}
		}
	}

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`${res.status} - ${res.statusText}`);
	}

	return res.json() as Promise<T>;
}
