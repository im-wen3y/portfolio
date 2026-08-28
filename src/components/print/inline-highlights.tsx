const REGEX_SPECIAL = /[.*+?^${}()|[\]\\]/g;

export function InlineHighlights({
	text,
	highlights = []
}: {
	text: string;
	highlights?: string[];
}) {
	if (highlights.length === 0) return <>{text}</>;

	const escaped = highlights.map((highlight) => highlight.replace(REGEX_SPECIAL, '\\$&'));
	const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));

	return (
		<>
			{parts.map((part, index) =>
				highlights.includes(part) ? (
					<strong className="document-emphasis" key={`${part}-${index}`}>
						{part}
					</strong>
				) : (
					part
				)
			)}
		</>
	);
}
