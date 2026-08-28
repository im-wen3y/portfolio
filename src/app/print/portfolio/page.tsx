import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';

export const metadata: Metadata = { title: '포트폴리오' };

export default function PrintPortfolioPage() {
	return <PrintShell variant="portfolio" />;
}
