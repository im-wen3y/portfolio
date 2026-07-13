import { redirect, type Handle } from '@sveltejs/kit';
import { hasOwnerSession } from '$lib/server/owner-auth';

function isPrintPath(pathname: string): boolean {
	return pathname === '/print' || pathname.startsWith('/print/');
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isOwner = hasOwnerSession(event.cookies);
	const isPrivatePath = isPrintPath(event.url.pathname) || event.url.pathname.startsWith('/owner');

	if (isPrintPath(event.url.pathname) && !event.locals.isOwner) {
		const next = `${event.url.pathname}${event.url.search}`;
		redirect(303, `/owner?next=${encodeURIComponent(next)}`);
	}

	const response = await resolve(event);
	if (isPrivatePath || event.locals.isOwner) {
		response.headers.set('cache-control', 'private, no-store');
	}
	return response;
};
