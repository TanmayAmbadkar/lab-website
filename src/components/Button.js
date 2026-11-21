import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    to,
    onClick,
    children,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    ...rest
}) => {
    const baseClasses =
        'inline-flex items-center justify-center text-center px-6 py-3 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20',
        secondary: 'bg-gray-800/80 text-gray-200 border border-white/10 hover:bg-gray-700/80 hover:text-white',
        danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20',
    };

    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
            {children}
        </button>
    );
};

export default Button;
