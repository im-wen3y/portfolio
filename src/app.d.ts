// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isOwner: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// vite/client는 '*.pdf'만 선언하고 ?inline 접미사는 다루지 않는다
declare module '*.pdf?inline' {
	const dataUri: string;
	export default dataUri;
}

export {};
