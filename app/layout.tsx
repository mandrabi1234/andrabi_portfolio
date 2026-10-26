import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import profile from '@/content/profile';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const title = `${profile.name} – ${profile.title}`;

export const metadata: Metadata = {
	metadataBase: profile.siteUrl ? new URL(profile.siteUrl) : undefined,
	title,
	description: profile.tagline,
	keywords: ['Software Engineer', 'Full-Stack', 'Data Engineering', 'Sports Analytics', 'Python', 'TypeScript', 'React', 'AWS', 'AI', profile.name],
	authors: [{ name: profile.name }],
	creator: profile.name,
	openGraph: {
		title,
		description: profile.tagline,
		url: profile.siteUrl,
		siteName: `${profile.name} – Portfolio`,
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title,
		description: profile.tagline,
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
