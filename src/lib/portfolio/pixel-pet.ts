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

export const STAGE_LABELS = ['EGG', 'CRACKING...', 'HATCHING...', 'CHICK', 'HEN Lv.7'];
