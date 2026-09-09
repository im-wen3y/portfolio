import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/styles/tracker.css';
import { OverlayRoot } from './overlay-root';

const plexSans = IBM_Plex_Sans_KR({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--tracker-sans'
});

// 숫자·날짜·라벨용. 통계와 표의 자릿수를 맞추는 게 목적이라 두 굵기면 충분하다
const plexMono = IBM_Plex_Mono({
	weight: ['400', '500'],
	subsets: ['latin'],
	variable: '--tracker-mono'
});

// proxy.ts가 소유자 인증으로 막는 경로다. 검색 노출도 막는다.
export const metadata: Metadata = {
	title: '이직 지원 트래커',
	description: '지원 현황 대시보드',
	robots: { index: false, follow: false, noarchive: true }
};

export default function TrackerLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<main className={`tracker ${plexSans.variable} ${plexMono.variable}`}>
			<div className="window">
				<div className="titlebar">
					<span className="lights" />
					<span className="titlebar-name">이직 지원 트래커</span>
				</div>
				<OverlayRoot>{children}</OverlayRoot>
			</div>
		</main>
	);
}
