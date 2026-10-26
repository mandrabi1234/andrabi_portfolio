'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { ProjectImage } from '@/lib/projects';

/** Screenshot grid. Click an image to open it full size; arrow keys move between images, Esc closes. */
export default function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
	const [open, setOpen] = useState<number | null>(null);

	const close = useCallback(() => setOpen(null), []);
	const step = useCallback(
		(dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
		[images.length],
	);

	useEffect(() => {
		if (open === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') step(1);
			if (e.key === 'ArrowLeft') step(-1);
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [open, close, step]);

	if (images.length === 0) return null;
	const current = open !== null ? images[open] : null;

	return (
		<>
			<div className={`grid gap-4 ${images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
				{images.map((img, i) => (
					<figure key={img.src} className="space-y-2">
						<button
							type="button"
							onClick={() => setOpen(i)}
							className="relative block w-full aspect-[16/10] rounded-lg overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800 hover:ring-gray-400 dark:hover:ring-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-white"
							aria-label={`Open screenshot ${i + 1}${img.caption ? `: ${img.caption}` : ''}`}
						>
							<Image
								src={img.src}
								alt={img.alt ?? img.caption ?? `${title} screenshot ${i + 1}`}
								fill
								sizes="(min-width: 640px) 380px, 100vw"
								className="object-cover object-top"
							/>
						</button>
						{img.caption && <figcaption className="text-xs text-gray-500 dark:text-gray-400">{img.caption}</figcaption>}
					</figure>
				))}
			</div>

			{current && (
				<div
					className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-label={current.caption ?? 'Screenshot'}
					onClick={close}
				>
					<div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
						<Image src={current.src} alt={current.alt ?? current.caption ?? ''} fill sizes="100vw" className="object-contain" />
					</div>
					<div className="mt-3 flex items-center gap-4 text-sm text-gray-300" onClick={(e) => e.stopPropagation()}>
						{images.length > 1 && (
							<button type="button" onClick={() => step(-1)} className="px-3 py-1 rounded-full ring-1 ring-gray-600 hover:bg-white/10" aria-label="Previous screenshot">
								←
							</button>
						)}
						<span className="text-center max-w-xl">
							{current.caption}
							{images.length > 1 && <span className="text-gray-500"> ({(open ?? 0) + 1}/{images.length})</span>}
						</span>
						{images.length > 1 && (
							<button type="button" onClick={() => step(1)} className="px-3 py-1 rounded-full ring-1 ring-gray-600 hover:bg-white/10" aria-label="Next screenshot">
								→
							</button>
						)}
					</div>
					<button type="button" onClick={close} className="absolute top-4 right-4 px-3 py-1 text-sm text-gray-300 rounded-full ring-1 ring-gray-600 hover:bg-white/10">
						Close
					</button>
				</div>
			)}
		</>
	);
}
