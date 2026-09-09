import { redirect } from 'next/navigation';

// 인쇄 화면의 기본 문서는 지원용 이력서다. 기본형 이력서는 /print/v1 에 있다.
export default function PrintIndexPage() {
	redirect('/print/senior');
}
