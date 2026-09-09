'use client';

import { OverlayProvider } from 'overlay-kit';
import type { ReactNode } from 'react';

// overlay-kit은 앱 트리에 Provider가 한 번 있어야 한다. 트래커에서만 쓰므로 이 레이아웃에만 둔다.
export function OverlayRoot({ children }: { children: ReactNode }) {
	return <OverlayProvider>{children}</OverlayProvider>;
}
