import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const COMPANIES = ['miricanvas', 'miricanvas-senior'] as const;
type Company = (typeof COMPANIES)[number];

function isCompany(value: string): value is Company {
	return (COMPANIES as readonly string[]).includes(value);
}

export const load: PageLoad = ({ params }) => {
	if (!isCompany(params.company)) {
		error(404, '지원 회사 프로필을 찾을 수 없습니다.');
	}

	return { company: params.company };
};
