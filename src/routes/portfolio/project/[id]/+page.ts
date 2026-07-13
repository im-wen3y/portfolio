import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import { projectVisuals } from '$lib/portfolio/project-visuals';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.id === params.id);
	if (!project) {
		error(404, '프로젝트를 찾을 수 없어요');
	}
	return { project, visual: projectVisuals[project.id] };
};
