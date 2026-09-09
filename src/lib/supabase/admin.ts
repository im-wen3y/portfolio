import 'server-only';

import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name: 'SUPABASE_URL' | 'SUPABASE_SECRET_KEY') {
	const value = process.env[name];
	if (!value) throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
	return value;
}

export const supabaseAdmin = createClient(
	getRequiredEnv('SUPABASE_URL'),
	getRequiredEnv('SUPABASE_SECRET_KEY'),
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);
