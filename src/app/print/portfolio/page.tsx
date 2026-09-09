import type { Metadata } from 'next';
import { PrintShell } from '@/components/print/print-shell';
import { getPortfolioData, getSharedResumeData } from '@/lib/resume/get-private-resume';

export const metadata: Metadata = { title: '포트폴리오' };

export default async function PrintPortfolioPage() {
	const [sharedResumeData, portfolioData] = await Promise.all([
		getSharedResumeData(),
		getPortfolioData()
	]);

	return (
		<PrintShell
			variant="portfolio"
			sharedResumeData={sharedResumeData}
			portfolioData={portfolioData}
		/>
	);
}
