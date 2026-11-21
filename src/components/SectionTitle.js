import React from 'react';

const SectionTitle = ({ children, as = 'h2', subtitle, className = '' }) => {
    const Heading = as;
    const sizeClasses =
        as === 'h1'
            ? 'text-4xl md:text-5xl font-extrabold tracking-tight text-white'
            : 'text-3xl md:text-4xl font-bold tracking-tight text-white';

    return (
        <div className={`text-center mb-12 ${className}`}>
            <Heading className={sizeClasses}>{children}</Heading>
            {subtitle && (
                <p className="mt-3 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
