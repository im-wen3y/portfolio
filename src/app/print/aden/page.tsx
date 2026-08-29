import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { PRINT_TARGET_RESUMES } from '@/data/print-profile';

export const metadata: Metadata = { title: `${PRINT_TARGET_RESUMES.aden.label} 이력서` };

export default function PrintAdenPage() {
	return <PrintShell variant="aden" />;
}
