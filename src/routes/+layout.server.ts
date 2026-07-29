import { dev } from '$app/environment';
import type { LayoutServerLoad } from './$types';

const KOREA_UTC_OFFSET_HOURS = 9;
const DAYTIME_START_HOUR = 6;
const NIGHTTIME_START_HOUR = 18;

function getSocialImagePath(date = new Date()) {
	const koreaHour = (date.getUTCHours() + KOREA_UTC_OFFSET_HOURS) % 24;
	const isDaytime = koreaHour >= DAYTIME_START_HOUR && koreaHour < NIGHTTIME_START_HOUR;

	return isDaytime ? '/og-image-bright.png' : '/og-image.png';
}

export const load: LayoutServerLoad = ({ locals }) => ({
	showPrintMenu: dev || locals.isOwner,
	socialImagePath: getSocialImagePath()
});
