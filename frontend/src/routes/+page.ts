import { fetchAPI } from '../utils/api';
import type { PageLoad } from './$types';

export async function _fetchHelloWorld(name?: string) {
	return fetchAPI<{ text: string }>(`/helloworld`, { query: { name } });
}

// Pre-load the hello world fetch result and send it to +page.svelte
export const load: PageLoad = async () => {
	return _fetchHelloWorld();
};
