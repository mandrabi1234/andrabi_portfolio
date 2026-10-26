import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-900 px-6 text-center">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
			<Link href="/" className="text-sm text-gray-600 dark:text-gray-400 underline underline-offset-2">
				Back to the portfolio
			</Link>
		</main>
	);
}
