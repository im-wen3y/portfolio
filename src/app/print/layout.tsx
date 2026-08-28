import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/resume-print.css';

// 인쇄 문서는 검색에 노출되면 안 된다. 개별 문서 제목은 PrintShell이 갱신한다.
export const metadata: Metadata = {
	title: { template: '%s - 송누리', default: '이력서 - 송누리' },
	description: '송누리의 이력서 PDF 미리보기',
	robots: { index: false, follow: false, noarchive: true }
};

export default function PrintLayout({ children }: Readonly<{ children: ReactNode }>) {
	return <main>{children}</main>;
}
