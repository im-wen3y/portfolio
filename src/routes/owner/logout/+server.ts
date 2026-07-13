import { redirect, type RequestHandler } from '@sveltejs/kit';
import { clearOwnerSession } from '$lib/server/owner-auth';

export const POST: RequestHandler = ({ cookies }) => {
	clearOwnerSession(cookies);
	redirect(303, '/owner');
};
