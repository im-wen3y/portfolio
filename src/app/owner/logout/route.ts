import { redirect } from 'next/navigation';
import { clearOwnerSession } from '@/lib/owner-session';

export async function POST() {
	await clearOwnerSession();
	redirect('/owner');
}
