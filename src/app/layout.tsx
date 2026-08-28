import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL('https://im-wen3yz.vercel.app'),
	title: 'im-wen3y',
	icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="ko">
			<head>
				<meta name="text-scale" content="scale" />
			</head>
			<body>{children}</body>
		</html>
	);
}
