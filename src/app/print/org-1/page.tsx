import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { getSharedResumeData, getTargetResume } from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '지원처 1 FE 이력서' };

export default async function PrintOrg1Page() {
	const [targetResume, sharedResumeData] = await Promise.all([
		getTargetResume('org-1'),
		getSharedResumeData()
	]);

	return (
		<PrintShell variant="org-1" targetResume={targetResume} sharedResumeData={sharedResumeData} />
	);
}
