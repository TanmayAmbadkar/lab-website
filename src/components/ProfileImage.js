import React, { useState } from 'react';

const ProfileImage = ({ src, name, className }) => {
    // State to track if the image has failed to load
    const [error, setError] = useState(false);

    // Function to generate initials from a name
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        // Get the first letter of the first and last name
        if (parts.length > 1) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        // Or just the first letter if it's a single name
        return `${parts[0][0]}`.toUpperCase();
    };

    // This function is called if the image fails to load
    const handleError = () => {
        setError(true);
    };

    // If there's an error (or no src provided), render the fallback div
    if (error || !src) {
        return (
            <div className={`${className} flex items-center justify-center bg-gray-700 text-white font-bold text-4xl md:text-5xl`}>
                {getInitials(name)}
            </div>
        );
    }

    // Otherwise, render the image
    return (
        <img
            src={src}
            alt={name}
            className={className}
            onError={handleError} // The key part: call handleError on failure
        />
    );
};

export default ProfileImage;