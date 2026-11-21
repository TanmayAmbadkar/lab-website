import React from 'react';

const normalizeUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('/') ||
        trimmed.startsWith('mailto:')
    ) {
        return trimmed;
    }
    return `https://${trimmed}`;
};

const SocialLinks = ({ links, align = 'center', showLabels = false }) => {
    if (!links) {
        return null;
    }

    const items = [
        links.email && {
            key: 'email',
            href: `mailto:${links.email.trim()}`,
            label: 'Email',
            external: false,
            icon: (
                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        links.cv && {
            key: 'cv',
            href: normalizeUrl(links.cv),
            label: 'Website / CV',
            external: true,
            icon: (
                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            ),
        },
        links.scholar && {
            key: 'scholar',
            href: normalizeUrl(links.scholar),
            label: 'Google Scholar',
            external: true,
            icon: (
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9 12 9s-5.548 2.249-6.758 4.769zM12 10c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5-2.5-1.119-2.5-2.5 1.119-2.5 2.5-2.5z" />
                </svg>
            ),
        },
        links.linkedin && {
            key: 'linkedin',
            href: normalizeUrl(links.linkedin),
            label: 'LinkedIn',
            external: true,
            icon: (
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        links.github && {
            key: 'github',
            href: normalizeUrl(links.github),
            label: 'GitHub',
            external: true,
            icon: (
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
    ].filter((item) => item && item.href);

    if (items.length === 0) {
        return null;
    }

    const justifyClass = align === 'left' ? 'justify-start' : 'justify-center';

    return (
        <div className={`flex flex-wrap items-center ${justifyClass} gap-3 mt-4`}>
            {items.map((item) => (
                <a
                    key={item.key}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={`${links.name ? `${links.name} — ` : ''}${item.label}`}
                    title={item.label}
                    className={`inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        showLabels ? 'text-sm px-2.5 py-1 bg-white/5 border border-white/10 hover:border-white/25' : 'p-1'
                    }`}
                >
                    {item.icon}
                    {showLabels && <span>{item.label}</span>}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;
