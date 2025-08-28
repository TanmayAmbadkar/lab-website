import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, onClick, children, variant = 'primary', className = '' }) => {
    // Base styles for the button/link
    const baseClasses = 'inline-block text-center px-6 py-3 rounded-full font-semibold transition-all duration-300';
    
    // Style variants
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20',
        secondary: 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/70'
    };

    // If a 'to' prop is provided, render a React Router Link
    if (to) {
        return (
            <Link to={to} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
                {children}
            </Link>
        );
    }

    // Otherwise, render a standard button with an onClick handler
    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
