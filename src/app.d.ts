// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Array<T> {
		map<U>(
			callbackfn: (value: T, index: number, array: T[]) => U,
			thisArg?: unknown
		): { [K in keyof this]: U };
		filter<S extends T>(
			callbackfn: (value: T, index: number, array: T[]) => value is S,
			thisArg?: unknown
		): { [K in keyof this]-?: this[K] extends S ? S : never };
	}
}

export {};
