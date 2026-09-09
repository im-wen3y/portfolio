import { PrintShell } from '@/components/print/print-shell';
import { getCareerData, getResumeData, getSharedResumeData } from '@/lib/resume/get-private-resume';

export default async function PrintResumePage() {
	const [sharedResumeData, resumeData, careerData] = await Promise.all([
		getSharedResumeData(),
		getResumeData(),
		getCareerData()
	]);

	return (
		<PrintShell
			sharedResumeData={sharedResumeData}
			resumeData={resumeData}
			careerData={careerData}
		/>
	);
}
