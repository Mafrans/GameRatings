export function trimStart(string: string, trim: string) {
	while (string.startsWith(trim)) {
		string = string.substring(string.length - trim.length);
	}
	return string;
}

export function trimEnd(string: string, trim: string) {
	while (string.endsWith(trim)) {
		string = string.substring(0, string.length - trim.length);
	}
	return string;
}

export function trimBoth(string: string, trim: string) {
	return trimStart(trimEnd(string, trim), trim);
}
