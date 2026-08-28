import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';

export const metadata: Metadata = { title: '경력기술서' };

export default function PrintCareerPage() {
	return <PrintShell variant="career" />;
}
