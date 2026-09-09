import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { getSharedResumeData, getTargetResume } from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '지원처 2 FE 이력서' };

export default async function PrintOrg2Page() {
	const [targetResume, sharedResumeData] = await Promise.all([
		getTargetResume('org-2'),
		getSharedResumeData()
	]);

	return (
		<PrintShell variant="org-2" targetResume={targetResume} sharedResumeData={sharedResumeData} />
	);
}
