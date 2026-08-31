import { NextResponse, type NextRequest } from 'next/server';
import { hasOwnerSessionToken, OWNER_SESSION_COOKIE } from '@/lib/owner-auth';

// 구 hooks.server.ts. Next 16에서 middleware 는 proxy 로 이름이 바뀌었고 Node 런타임이 기본이다.
const REDIRECT_SEE_OTHER = 303;

function isPrintPath(pathname: string): boolean {
	return pathname === '/print' || pathname.startsWith('/print/');
}

export function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	const isOwner = hasOwnerSessionToken(request.cookies.get(OWNER_SESSION_COOKIE)?.value);
	const isPrivatePath = isPrintPath(pathname) || pathname.startsWith('/owner');

	if (isPrintPath(pathname) && !isOwner) {
		const next = `${pathname}${search}`;
		const url = new URL(`/owner?next=${encodeURIComponent(next)}`, request.url);
		return NextResponse.redirect(url, REDIRECT_SEE_OTHER);
	}

	const response = NextResponse.next();
	if (isPrivatePath || isOwner) {
		response.headers.set('cache-control', 'private, no-store');
	}
	return response;
}

export const config = {
	// 정적 자산까지 걸리면 CSS·이미지가 막힌다
	matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)']
};
