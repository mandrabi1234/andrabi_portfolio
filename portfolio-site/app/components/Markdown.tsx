import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders a project's markdown body. Raw HTML is not rendered; <!-- notes --> are stripped in lib/projects.ts. */
export default function Markdown({ children }: { children: string }) {
	return (
		<div className="prose prose-sm sm:prose-base prose-gray dark:prose-invert max-w-none prose-headings:font-semibold prose-a:underline-offset-2 prose-img:rounded-lg prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-gray-700">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				skipHtml
				components={{
					a: ({ href, children }) => {
						const external = href?.startsWith('http');
						return (
							<a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
								{children}
							</a>
						);
					},
				}}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
}
