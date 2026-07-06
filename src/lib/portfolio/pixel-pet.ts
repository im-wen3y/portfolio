export type PixelFrame = string[];
export type PixelPalette = Record<string, string>;

export function renderPixelArt(
	canvas: HTMLCanvasElement | undefined,
	frame: PixelFrame,
	palette: PixelPalette
) {
	if (!canvas) return;
	const h = frame.length;
	const w = Math.max(...frame.map((row) => row.length));
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	ctx.clearRect(0, 0, w, h);
	for (let y = 0; y < frame.length; y++) {
		const row = frame[y];
		for (let x = 0; x < row.length; x++) {
			const color = palette[row[x]];
			if (!color) continue;
			ctx.fillStyle = color;
			ctx.fillRect(x, y, 1, 1);
		}
	}
}

// cozy evolution sprites (18x18): egg -> crack -> hatch -> chick -> hen
const EGG: PixelFrame = [
	'..................',
	'..................',
	'..................',
	'........OO........',
	'.......OSSO.......',
	'......OSSSSO......',
	'......OSSSSO......',
	'.....OSSWWSSO.....',
	'....OSSSWWSSSO....',
	'....OSSWWWWSSO....',
	'....OSSWWWWSSO....',
	'....OSSSWWSSSO....',
	'....OsSSSSSSsO....',
	'.....OsSSSSsO.....',
	'......OssssO......',
	'.......OOOO.......',
	'..................',
	'..................'
];
const CRACK: PixelFrame = [
	'..................',
	'..................',
	'..................',
	'........OO........',
	'.......OSSO.......',
	'......OSSSSO......',
	'......OSSSSO......',
	'.....OSSWWSSO.....',
	'....OSSoWWoSSO....',
	'....OSoSWWSoSO....',
	'....OSSoWWoSSO....',
	'....OSSSWWSSSO....',
	'....OsSSSSSSsO....',
	'.....OsSSSSsO.....',
	'......OssssO......',
	'.......OOOO.......',
	'..................',
	'..................'
];
const HATCH: PixelFrame = [
	'..................',
	'..................',
	'..................',
	'........GG........',
	'......OYYYYO......',
	'.....OYYYYYYO.....',
	'.....OYEYYEYO.....',
	'.....OYYBBYYO.....',
	'....OYYYYYYYYO....',
	'...OSSSSSSSSSSO...',
	'...OSWWWWWWWWSO...',
	'...OSWWWWWWWWSO...',
	'....OSWWWWWWSO....',
	'....OSSWWWWSSO....',
	'.....OsSSSSsO.....',
	'......OOOOOO......',
	'..................',
	'..................'
];
const CHICK: PixelFrame = [
	'..................',
	'..................',
	'..................',
	'.......GGG........',
	'......OYYYYO......',
	'.....OYYYYYYO.....',
	'.....OYEYYEYO.....',
	'....OYPYBBYPYO....',
	'....OYYYYYYYYO....',
	'...OYYYYYYYYYYO...',
	'...OYYYYYYYYYYO...',
	'...OyYYYYYYYYGO...',
	'....OyyYYYYyyO....',
	'.....OGGGGGGO.....',
	'......LL..LL......',
	'.....LLL..LLL.....',
	'..................',
	'..................'
];
const HEN: PixelFrame = [
	'..................',
	'..................',
	'.........RR.......',
	'........RRRR......',
	'......OHHHHHO.....',
	'.....OBHEHHHHO....',
	'....OHHPHHHHHHO...',
	'...OHHHHHHHHHHO...',
	'..OHHHHNNNNHHHHO..',
	'..OHhHHNHHHHHHHO..',
	'..OhhHHHHHHHHHHO..',
	'..OhhhHHHHHHHhhO..',
	'...OhhhhHHHHhhO...',
	'....OhhhhhhhhO....',
	'.....LL...LL......',
	'....LLL...LLL.....',
	'..................',
	'..................'
];

export const PET_FRAMES: PixelFrame[] = [EGG, CRACK, HATCH, CHICK, HEN];
export const STAGE_LABELS = ['EGG', 'CRACKING...', 'HATCHING...', 'CHICK', 'HEN Lv.7'];

export const PET_PALETTE: PixelPalette = {
	O: '#8a5a3a',
	o: '#6e4428',
	S: '#f0e2c8',
	s: '#e3cfa8',
	W: '#fff8ec',
	Y: '#ffd24d',
	y: '#ffe9a0',
	G: '#ffb347',
	B: '#f2913a',
	R: '#e0574a',
	P: '#f2a6a0',
	H: '#e8c78f',
	h: '#f3ddac',
	N: '#d4a86a',
	E: '#4a3226',
	L: '#f2913a'
};

export function paintPet(canvas: HTMLCanvasElement | undefined, stage: number) {
	renderPixelArt(canvas, PET_FRAMES[stage] ?? PET_FRAMES[0], PET_PALETTE);
}
