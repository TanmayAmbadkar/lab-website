import React from 'react';

const Card = ({ children, className = '', interactive = false }) => (
    <div
        className={`glass-effect rounded-2xl p-6 md:p-8 transition-all duration-300 ${
            interactive ? 'hover:bg-gray-800/75 hover:border-white/20 hover:-translate-y-0.5' : ''
        } ${className}`}
    >
        {children}
    </div>
);

export default Card;
