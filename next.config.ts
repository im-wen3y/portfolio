import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	trailingSlash: true,
	async redirects() {
		// 외부에 공유된 기존 포트폴리오 주소를 보존한다
		return [{ source: '/portfolio', destination: '/', permanent: true }];
	}
};

export default nextConfig;
