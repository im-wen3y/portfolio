import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import {
	getCareerData,
	getSharedResumeData,
	getTargetResume
} from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '지원처 3 FE 경력기술서' };

export default async function PrintCareerOrg3Page() {
	const [targetResume, sharedResumeData, careerData] = await Promise.all([
		getTargetResume('org-3'),
		getSharedResumeData(),
		getCareerData()
	]);

	return (
		<PrintShell
			variant="career-org-3"
			targetResume={targetResume}
			sharedResumeData={sharedResumeData}
			careerData={careerData}
		/>
	);
}
