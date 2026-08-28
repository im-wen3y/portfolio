'use client';

import { useRef, useState, type ReactNode, type UIEvent } from 'react';

// 데스크톱에서는 .portfolio-feed 자체가 스크롤 컨테이너다(globals.css의 미디어 쿼리).
// 맨 위로 버튼은 피드 끝에 닿았을 때만 나타나므로 피드와 상태를 함께 갖는다.
const FEED_END_THRESHOLD_PX = 24;

export function PortfolioFeed({ children }: { children: ReactNode }) {
	const feed = useRef<HTMLDivElement>(null);
	const [atEnd, setAtEnd] = useState(false);

	function handleScroll(event: UIEvent<HTMLDivElement>) {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
		setAtEnd(scrollTop + clientHeight >= scrollHeight - FEED_END_THRESHOLD_PX);
	}

	function scrollToTop() {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		feed.current?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	return (
		<div className="portfolio-feed" ref={feed} onScroll={handleScroll}>
			{children}
			<button
				className={atEnd ? 'top-button top-button-visible' : 'top-button'}
				type="button"
				onClick={scrollToTop}
				aria-label="콘텐츠 맨 위로 이동"
			>
				TOP
			</button>
		</div>
	);
}
