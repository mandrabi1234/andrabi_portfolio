import Image from 'next/image';
import profile from '@/content/profile';
import Link from 'next/link';
import services from '@/content/services';
import SocialLinks from './SocialLinks';

const ProfileSection = () => {
	return (
		<div className="w-full py-8 md:py-0 bg-white dark:bg-gray-900 px-6 pt-16 sm:pt-0">
			<div className="space-y-8 text-center">
				<div className="relative w-28 md:w-40 h-28 md:h-40 mx-auto">
					<div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
						<Image src={profile.photo} alt={profile.name} fill sizes="160px" className="object-cover" priority />
					</div>
				</div>

				<div className="space-y-3">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
					<h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{profile.title}</h2>
					<div className="h-px w-16 bg-gray-200 dark:bg-gray-700 mx-auto my-4" />
					<p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">{profile.tagline}</p>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-center space-x-2">
						<svg className="w-4 h-4 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<a href={`mailto:${profile.email}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
							{profile.email}
						</a>
					</div>

					<div className="flex items-center justify-center space-x-2">
						<svg className="w-4 h-4 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span className="text-sm text-gray-600 dark:text-gray-400">{profile.location}</span>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-2">
					{services.enabled && (
						<Link
							href="/services/"
							className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90"
						>
							Work with me
						</Link>
					)}
					{profile.resumeUrl && (
						<a
							href={profile.resumeUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block px-4 py-1.5 text-sm rounded-full ring-1 ring-gray-300 dark:ring-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
						>
							Download resume
						</a>
					)}
					</div>

					<div className="pt-2">
						<SocialLinks />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSection;
