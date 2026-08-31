import type { ReactNode } from 'react';

export function PortfolioFeed({ children }: { children: ReactNode }) {
	return <div className="portfolio-feed">{children}</div>;
}
