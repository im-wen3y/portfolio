import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { getCareerData, getSharedResumeData } from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '경력기술서' };

export default async function PrintCareerPage() {
	const [sharedResumeData, careerData] = await Promise.all([
		getSharedResumeData(),
		getCareerData()
	]);

	return (
		<PrintShell variant="career" sharedResumeData={sharedResumeData} careerData={careerData} />
	);
}
