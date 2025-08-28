import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '' }) => {
    const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300';
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
        secondary: 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/70'
    };
    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;