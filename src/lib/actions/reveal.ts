export function reveal(node: HTMLElement, params?: { delay?: number }) {
	const delay = params?.delay ?? 0;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('in-view');
		return {};
	}

	node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
