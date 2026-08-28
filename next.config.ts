import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	trailingSlash: true,
	// 인쇄용 PDF는 public/에 두면 공개 URL이 되어 소유자 인증이 무의미해진다.
	// 서버 번들에는 포함시켜야 하므로 파일 트레이싱에 명시한다.
	outputFileTracingIncludes: {
		'/print/download/[version]': ['./src/server-assets/*.pdf']
	},
	async redirects() {
		// 외부에 공유된 기존 포트폴리오 주소를 보존한다
		return [{ source: '/portfolio', destination: '/', permanent: true }];
	}
};

export default nextConfig;
