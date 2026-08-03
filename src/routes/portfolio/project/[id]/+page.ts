import { error } from '@sveltejs/kit';
import { PORTFOLIO_PROJECTS } from '$lib/data/portfolio-projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = PORTFOLIO_PROJECTS.find((item) => item.id === params.id);

	if (!project) {
		error(404, '프로젝트를 찾을 수 없습니다.');
	}

	return { project };
};
