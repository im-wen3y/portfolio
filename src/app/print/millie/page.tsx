import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { PRINT_TARGET_RESUMES } from '@/data/print-profile';

export const metadata: Metadata = { title: `${PRINT_TARGET_RESUMES.millie.label} 이력서` };

export default function PrintMilliePage() {
	return <PrintShell variant="millie" />;
}
