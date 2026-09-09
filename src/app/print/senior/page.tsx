import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { getSharedResumeData, getTargetResume } from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '시니어 FE 이력서' };

export default async function PrintSeniorPage() {
	const [targetResume, sharedResumeData] = await Promise.all([
		getTargetResume('senior'),
		getSharedResumeData()
	]);

	return (
		<PrintShell variant="senior" targetResume={targetResume} sharedResumeData={sharedResumeData} />
	);
}
