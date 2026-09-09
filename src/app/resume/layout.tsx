import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/resume-print.css';

// /print/* 는 proxy.ts가 소유자 인증으로 막지만 이 경로는 링크만 알면 열린다.
// 대신 검색 노출은 막아 링크를 받은 사람만 보게 한다.
export const metadata: Metadata = {
	title: '이력서 - 송누리',
	description: '송누리의 프론트엔드 이력서',
	robots: { index: false, follow: false, noarchive: true }
};

export default function ResumeLayout({ children }: Readonly<{ children: ReactNode }>) {
	return <main>{children}</main>;
}
