import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { PortfolioNav } from '@/components/portfolio-nav';
import '@/styles/portfolio.css';

const TITLE = '프론트엔드 개발자 · 송누리 · 포트폴리오';
const DESCRIPTION =
	'레거시 분석과 React 리뉴얼, UI·UX, 사용자 흐름과 운영 문제 해결 과정을 담은 송누리의 프론트엔드 포트폴리오입니다.';

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		type: 'website',
		locale: 'ko_KR',
		siteName: 'im-wen3y',
		title: TITLE,
		description: DESCRIPTION,
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: '코드 괄호와 별 모양이 있는 im-wen3y 아이콘'
			}
		]
	},
	twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION }
};

export default function PortfolioLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<PortfolioNav />
			{children}
		</>
	);
}
