import React from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`glass-effect rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-gray-800/80 hover:scale-[1.02] ${className}`}>
        {children}
    </div>
);

export default Card;