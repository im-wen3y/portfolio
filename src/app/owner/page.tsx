import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { safeDestination } from '@/lib/owner-auth';
import { hasOwnerSession } from '@/lib/owner-session';
import { LoginForm } from './login-form';
import '@/styles/owner.css';

export const metadata: Metadata = {
	title: '소유자 로그인 — im-wen3y',
	description: '인쇄용 이력서와 포트폴리오에 접근하기 위한 소유자 로그인',
	robots: { index: false, follow: false, noarchive: true }
};

export default async function OwnerPage({
	searchParams
}: {
	searchParams: Promise<{ next?: string }>;
}) {
	const { next } = await searchParams;
	const destination = safeDestination(next ?? null);
	if (await hasOwnerSession()) redirect(destination);

	return (
		<main className="owner-login">
			<div className="access-panel">
				<div className="access-status" aria-hidden="true">
					<span className="status-dot" />
					PRIVATE / PRINT
				</div>
				<p className="eyebrow">Owner access</p>
				<h1>문서 작업실</h1>
				<p className="description">인쇄용 이력서와 포트폴리오는 소유자 인증 후 열립니다.</p>

				<LoginForm next={destination} />

				<a className="back-link" href="/">
					공개 포트폴리오로 돌아가기 →
				</a>
			</div>
		</main>
	);
}
