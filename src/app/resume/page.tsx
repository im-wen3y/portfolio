import { PrintShell } from '@/components/print/print-shell';
import { getSharedResumeData, getTargetResume } from '@/lib/resume/get-private-resume';

// /print/senior 와 같은 문서를 인증 없이 보여준다.
// 인증이 없는 경로라 전화번호는 렌더뿐 아니라 데이터에서도 빼고 내려보낸다
// (컴포넌트에 넘긴 값은 HTML 페이로드에 그대로 실린다).
export default async function ResumePage() {
	const [targetResume, sharedResumeData] = await Promise.all([
		getTargetResume('senior'),
		getSharedResumeData()
	]);

	return (
		<PrintShell
			variant="senior"
			targetResume={targetResume}
			sharedResumeData={{ ...sharedResumeData, phone: '' }}
			publicView
		/>
	);
}
