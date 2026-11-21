import React, { useState, useEffect } from 'react';

const ProfileImage = ({ src, name, className = '' }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    const getInitials = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.trim().split(/\s+/).filter(Boolean);
        if (parts.length > 1) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return parts[0] ? parts[0][0].toUpperCase() : '';
    };

    if (error || !src) {
        return (
            <div
                aria-label={name || 'Profile avatar'}
                className={`${className} flex items-center justify-center bg-gray-800 text-gray-200 font-bold text-2xl md:text-3xl select-none`}
            >
                {getInitials(name)}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name || 'Lab member'}
            loading="lazy"
            decoding="async"
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default ProfileImage;
